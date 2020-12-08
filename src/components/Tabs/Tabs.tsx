import React from 'react';
import styled from 'styled-components';

import { Tab } from './Tab';
import { TabsComponent } from './Tabs.interface';

export const TabsContainerStyled = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.backgroundTertiary};
  padding: 4px;
  border: 0.5px solid ${({ theme }) => theme.colors.backgroundQuaternary};
  border-radius: 16px;
  height: 48px;
`;

export const Tabs: TabsComponent = ({ style, tabs, onChange, activeTab }) => {
  const handleChange = (name: string) => () => {
    if (name !== activeTab) {
      onChange(name);
    }
  };

  return (
    <TabsContainerStyled style={style}>
      {tabs.map(({ name, title }) => (
        <Tab key={name} active={activeTab === name} onPress={handleChange(name)}>
          {title}
        </Tab>
      ))}
    </TabsContainerStyled>
  );
};
