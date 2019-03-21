import React, { Component } from 'react';
import './App.css';
import { Menu } from 'antd';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SubMenu = Menu.SubMenu;

const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k+1}`,
    key: `item-${k+1}`,
    content: `Option ${k+1}`
  }));

const SortableItem = SortableElement(({children, type, item, ...props}) => {

  if(type === 'sub') {
    return <SubMenu {...props} key={item.id}>{children}</SubMenu>
  }

  return <Menu.Item {...props}>{children}</Menu.Item>
})

const SortableList = SortableContainer(({children, menuProps}) => {
  return (
    <Menu style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        {...menuProps}>{children}</Menu>
  )
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(4)
    };
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };

  render() {
    return (
      <div className="App">
       <SortableList onSortEnd={this.onSortEnd}>
         {this.state.items.map((item, index) => (
          <SortableItem item={item} key={item.id} index={index}>{item.content}</SortableItem>
          ))}
       </SortableList>
      </div>
    );
  }
}

export default App;
