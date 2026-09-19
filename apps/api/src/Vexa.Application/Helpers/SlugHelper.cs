using SlugifyHelper = Slugify.SlugHelper;

namespace Vexa.Application.Helpers;

public class SlugHelper
{
    public static string GenerateSlug(string name)
    {
        SlugifyHelper slugHelper = new();
        return slugHelper.GenerateSlug(name);
    }
}
