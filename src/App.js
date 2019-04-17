import React, { Component } from 'react';
import './App.css';
import data_source from './films.json'
import { Table, Form, message } from 'antd';
import {CenterLayout} from "./layout/center-layout";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [{
        title: '',
        dataIndex: 'poster',
        key: 'poster',
        // eslint-disable-next-line
        render: text => <a><img src={text} width={75} alt={''} referrerPolicy={'never'}/></a>
      },{
        title: '电影名',
        dataIndex: 'title',
        // key: '_id',
        // eslint-disable-next-line
        render: text => <a href="javascript:">{text}</a>
      }, {
        title: '评分',
        dataIndex: 'rating.average',
        // key: 'rating.average',
        sorter: (a, b) => a.rating.average - b.rating.average
      }, {
        title: '上映时间',
        dataIndex: 'pubdate[0]',
        // key: 'pubdate[0]',
      }, {
        title: '类型',
        dataIndex: 'genres',
        // key: 'genres',

        render: text => {
          let q=[];
          // console.log(typeof(q));
          for(const i of text) {
            // console.log(i);
            // eslint-disable-next-line
            q.push(<a href="javascript:">{i} </a>);

            // console.log((q))
          }
          return q
        }
      }
        //   }, {
        //     title: 'Age',
        //     dataIndex: 'age',
        //     key: 'age',
        //   }, {
        //     title: 'Address',
        //     dataIndex: 'address',
        //     key: 'address',
        //   }, {
        //     title: 'Tags',
        //     key: 'tags',
        //     dataIndex: 'tags',
        //     render: tags => (
        //         <span>
        //   {tags.map(tag => {
        //     let color = tag.length > 5 ? 'geekblue' : 'green';
        //     if (tag === 'loser') {
        //       color = 'volcano';
        //     }
        //     return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
        //   })}
        // </span>
        //     ),
        //   }, {
        //     title: 'Action',
        //     key: 'action',
        //     render: (text, record) => (
        //         <span>
        //   <a href="javascript:">Invite {record.name}</a>
        //   <Divider type="vertical" />
        //   <a href="javascript:">Delete</a>
        // </span>
        //     ),
        //   }]
      ]
    }
  }
  get_films_source() {
    if(data_source) {
      message.success('数据读取成功');
      this.setState({data:data_source})
      // for(const i in data_source){
      //   console.log(data_source[i])
      // }
    } else {
      message.error('数据读取失败')
    }
     console.log((data_source))
  }

  componentDidMount() {
  this.get_films_source();
}




  render() {
    return (
        <CenterLayout span={16}>
          <Form>
            <Form.Item>
              <Table columns={this.state.columns} dataSource={this.state.data} pagination={{pageSize:20}} />
            </Form.Item>
          </Form>
        </CenterLayout>
    );
  }
}

export default App;
