
using System.Linq.Expressions;
using System.Reflection;

namespace Vexa.Infrastructure.Repositories;

public class BaseRepository<TE>
{
    private const string _defaultSortBy = "CreatedAt";
    private const BindingFlags _bindingFlags = BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase;

    protected IQueryable<TE> ApplySortQuery(IQueryable<TE> query, string? sortBy, SortDirection? sortDirection = SortDirection.Desc)
    {
        string propertyName = string.IsNullOrWhiteSpace(sortBy) ? _defaultSortBy : sortBy.Trim();
        PropertyInfo? property = typeof(TE).GetProperty(propertyName, _bindingFlags);

        if (property == null)
        {
            return query;
        }

        ParameterExpression parameter = Expression.Parameter(typeof(TE), "item");
        MemberExpression propertyAccess = Expression.Property(parameter, property);
        LambdaExpression keySelector = Expression.Lambda(propertyAccess, parameter);

        string methodName = sortDirection != SortDirection.Asc ? nameof(Queryable.OrderByDescending) : nameof(Queryable.OrderBy);

        MethodCallExpression orderByExpression = Expression.Call(
            typeof(Queryable),
            methodName,
            [typeof(TE), property.PropertyType],
            query.Expression,
            Expression.Quote(keySelector)
        );

        return query.Provider.CreateQuery<TE>(orderByExpression);
    }

    protected IQueryable<TE> ApplySearchQuery(
        IQueryable<TE> query,
        string? searchKey,
        IReadOnlyList<Expression<Func<TE, string?>>> searchCols)
    {
        if (string.IsNullOrWhiteSpace(searchKey) || searchCols.Count == 0)
        {
            return query;
        }

        string searchPattern = $"%{searchKey.Trim()}%";
        ParameterExpression parameter = Expression.Parameter(typeof(TE), "item");
        MethodInfo ilikeMethod = typeof(NpgsqlDbFunctionsExtensions).GetMethod(
            nameof(NpgsqlDbFunctionsExtensions.ILike),
            [typeof(DbFunctions), typeof(string), typeof(string)])!;
        Expression? searchExpression = null;

        foreach (Expression<Func<TE, string?>> searchColumn in searchCols)
        {
            Expression propertyAccess = new ParameterReplaceVisitor(
                searchColumn.Parameters[0],
                parameter).Visit(searchColumn.Body)!;
            MethodCallExpression ilikeExpression = Expression.Call(
                ilikeMethod,
                Expression.Property(null, typeof(EF), nameof(EF.Functions)),
                propertyAccess,
                Expression.Constant(searchPattern));
            BinaryExpression notNullExpression = Expression.NotEqual(
                propertyAccess,
                Expression.Constant(null, typeof(string)));
            BinaryExpression searchableExpression = Expression.AndAlso(
                notNullExpression,
                ilikeExpression);

            searchExpression = searchExpression is null
                ? searchableExpression
                : Expression.OrElse(searchExpression, searchableExpression);
        }

        Expression<Func<TE, bool>> predicate = Expression.Lambda<Func<TE, bool>>(searchExpression!, parameter);
        return query.Where(predicate);
    }

    private sealed class ParameterReplaceVisitor(ParameterExpression source, ParameterExpression target)
        : ExpressionVisitor
    {
        protected override Expression VisitParameter(ParameterExpression node)
        {
            return node == source ? target : base.VisitParameter(node);
        }
    }
}
