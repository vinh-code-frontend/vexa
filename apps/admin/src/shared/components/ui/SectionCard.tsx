import { Card, Flex } from 'antd';
import type { ReactNode } from 'react';

type SectionCardProps = {
  children: ReactNode;
  aside: ReactNode;
  header: ReactNode;
};

const SectionCard = ({ children, aside, header }: SectionCardProps) => (
  <Flex vertical gap={16} style={{ minHeight: 0, width: '100%', flex: 1 }}>
    {header}
    <Flex gap={16} style={{ minHeight: 0, flex: 1 }}>
      <Card
        style={{
          minHeight: 0,
          minWidth: 0,
          flex: '1 1 70%',
          display: 'flex',
          flexDirection: 'column',
        }}
        styles={{ body: { minHeight: 0, flex: 1, padding: 20 } }}
      >
        {children}
      </Card>
      <Card
        style={{
          minHeight: 0,
          minWidth: 0,
          flex: '1 1 30%',
          display: 'flex',
          flexDirection: 'column',
        }}
        styles={{ body: { minHeight: 0, flex: 1, padding: 20 } }}
      >
        {aside}
      </Card>
    </Flex>
  </Flex>
);

export default SectionCard;
