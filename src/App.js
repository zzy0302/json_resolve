import React, {Component} from 'react';
import './App.css';
import data_source from './films.json'
import {Table, Form, message, LocaleProvider, Input, Button, Icon} from 'antd';
import {CenterLayout} from "./layout/center-layout";
import {FixedLayout} from "./layout/fixed-layout";
import {FixedRow} from "./layout/fixed-row";
import zh_CN from 'antd/lib/locale-provider/zh_CN';

class App extends Component {
    getColumnSearchProps = (dataIndex) => (
        {
            filterDropdown: ({
                                 setSelectedKeys, selectedKeys, confirm, clearFilters,
                             }) => (
                <LocaleProvider locale={zh_CN}>
                    <div style={{padding: 8}}>
                        <Input
                            ref={node => {
                                this.searchInput = node;
                            }}
                            placeholder={`Search ${dataIndex}`}
                            value={selectedKeys[0]}
                            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                            onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                            style={{width: 188, marginBottom: 8, display: 'block'}}
                        />
                        <Button
                            type="primary"
                            onClick={() => this.handleSearch(selectedKeys, confirm)}
                            icon="search"
                            size="small"
                            style={{width: 90, marginRight: 8}}
                        >
                            搜索
                        </Button>
                        <Button
                            onClick={() => this.handleReset(clearFilters)}
                            size="small"
                            style={{width: 90}}
                        >
                            重置
                        </Button>
                    </div>
                </LocaleProvider>
            ),
            filterIcon: filtered => <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>,
            onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => this.searchInput.select());
                }
            },
        });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({searchText: selectedKeys[0]});
    };

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({searchText: ''});
    };

    constructor(props) {
        super(props);
        this.state = {
            actor: [],
            data: [],
            filtervalue: '',
            loadDown: false,
            columns: [
                {
                    title: '',
                    dataIndex: 'poster',
                    key: '_id',
                    // eslint-disable-next-line
                    render: text => <a><img src={text} width={75} alt={''} referrerPolicy={'never'}/></a>
                }, {
                    title: '电影名',
                    dataIndex: 'title',
                    // key: '_id',
                    ...this.getColumnSearchProps('title'),
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
                    filters: [
                        {
                            text: '纪录片',
                            value: '纪录片',
                        }, {
                            text: '运动',
                            value: '运动',
                        }, {
                            text: '剧情',
                            value: '剧情',
                        }, {
                            text: '动作',
                            value: '动作',
                        }, {
                            text: '西部',
                            value: '西部',
                        }, {
                            text: '犯罪',
                            value: '犯罪',
                        }, {
                            text: '喜剧',
                            value: '喜剧',
                        }, {
                            text: '科幻',
                            value: '科幻',
                        }, {
                            text: '冒险',
                            value: '冒险',
                        }, {
                            text: '动画',
                            value: '动画',
                        }, {
                            text: '爱情',
                            value: '爱情',
                        }, {
                            text: '恐怖',
                            value: '恐怖',
                        }, {
                            text: '传记',
                            value: '传记',
                        }, {
                            text: '历史',
                            value: '历史',
                        }, {
                            text: '奇幻',
                            value: '奇幻',
                        }, {
                            text: '战争',
                            value: '战争',
                        }, {
                            text: '同性',
                            value: '同性',
                        }, {
                            text: '家庭',
                            value: '家庭',
                        }, {
                            text: '黑色电影',
                            value: '黑色电影',
                        }, {
                            text: '短片',
                            value: '短片',
                        }, {
                            text: '古装',
                            value: '古装',
                        },],
                    onFilter: (value, record) => {
                        // console.log(value);
                        // this.setState({filtervalue:value});
                        // console.log(record);
                        return record.genres.indexOf(value) !== -1
                    },

                    render: text => {
                        let q = [];
                        for (const i of text) {
                            // console.log(i);
                            // eslint-disable-next-line
                            q.push(<a onClick={() => {
                                this.filterit(i)
                            }}>{i} </a>);
                            // console.log((q))
                        }
                        return q
                    }
                }, {
                    title: '主演',
                    dataIndex: 'directors',
                    // key: 'pubdate[0]',
                    render: text => {
                        let q = [];
                        // console.log(typeof(q));
                        for (const i of text) {
                            // eslint-disable-next-line
                            q.push(<a href="javascript:">{i.name} </a>);
                        }
                        return q
                    }
                }

            ]
        }
    }

    filterit = (value) => {
        console.log(value);
        this.setState({filtervalue: value})
    };

    get_films_source() {
        if (data_source) {
            message.success('数据读取成功');
            this.setState({data: data_source})
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
        this.setState({loadDown: true})
    }


    render() {
        return (
            <LocaleProvider locale={zh_CN}>
                <FixedLayout>
                    <FixedRow>

                        <CenterLayout span={18}>
                            <Form>
                                {this.state.loadDown ?
                                    (
                                        <Form.Item>
                                            <Table columns={this.state.columns} dataSource={this.state.data}
                                                   pagination={{pageSize: 10, showSizeChanger: true}}/>
                                        </Form.Item>
                                    ) : null}
                            </Form>
                        </CenterLayout>

                    </FixedRow>
                </FixedLayout>
            </LocaleProvider>

        );
    }
}

export default App;
