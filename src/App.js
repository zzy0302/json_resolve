import React, {Component} from 'react';
import './App.css';
import data_source from './films.json'
// eslint-disable-next-line
import {
    Table,
    Form,
    message,
    LocaleProvider,
    Input,
    Button,
    Icon,
    Modal,
    PageHeader,
    Layout,
    Row,
    Col,
    Card,
    Statistic
} from 'antd';
import {CenterLayout} from "./layout/center-layout";
import {FixedLayout} from "./layout/fixed-layout";
import {FixedRow} from "./layout/fixed-row";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
/* eslint-disable */
const {Header, Content, Footer} = Layout;
const {Meta} = Card;

class App extends Component {

    getColumnSearchProps = (dataIndex) => ({
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
            filter_value: '',
            loadDown: false,
            modal_visible: false,
            modal_source: '',
            modal_title: '',
            modal_directors: '',
            modal_poster: '',
            modal_casts: [],
            modal_countries: '',
            modal_languages: '',
            modal_pubdate: '',
            modal_summary: '',
            modal_year: '',
            modal_writers: '',
            modal_rating: 0,
            modal_duration: 0,
            average_rating: 0,
            average_duration: 0,

            columns: [
                {
                    title: '',
                    dataIndex: 'poster',
                    key: 'key',
                    width: 150,
                    // eslint-disable-next-line
                    render: text => <a><img src={text} width={75} alt={''} referrerPolicy={'never'}/></a>
                }, {
                    title: '电影名',
                    dataIndex: 'title',
                    key: 'title',
                    width: 200,
                    ...this.getColumnSearchProps('title'),
                    // eslint-disable-next-line
                    render: text => <a href="javascript:"
                                       onClick={() => {
                                           this.setState({modal_source: text}, () => {
                                               this.modal_search()
                                           })
                                       }}
                    >{text}</a>
                }, {
                    title: '评分',
                    dataIndex: 'rating.average',
                    key: 'rating.average',
                    width: 80,
                    sorter: (a, b) => a.rating.average - b.rating.average
                }, {
                    title: '上映时间',
                    dataIndex: 'pubdate[0]',
                    key: 'pubdate[0]',
                    width: 150,
                }, {
                    title: '类型',
                    dataIndex: 'genres',
                    key: 'genres',
                    width: 200,
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
                    // eslint-disable-next-line
                    render: text => {
                        let q = [];
                        for (const i of text) {
                            // console.log(i);
                            // eslint-disable-next-line
                            q.push(<a key={i} onClick={() => {
                                message.warning('请用上方筛选按钮筛选')
                            }}>{i} </a>);
                            // console.log((q))
                        }
                        return q
                    }
                }, {
                    title: '导演',
                    dataIndex: 'directors',
                    key: 'directors',
                    width: 100,
                    // ...this.getColumnSearchProps('directors'),
                    render: text => {
                        let q = [];
                        // console.log(typeof(q));
                        for (const i of text) {
                            // eslint-disable-next-line
                            q.push(<a key={i.name} href="javascript:">{i.name} </a>);
                        }
                        return q
                    }
                }, {
                    title: '主演',
                    dataIndex: 'casts',
                    key: 'casts',
                    width: 200,
                    // ...this.getColumnSearchProps('casts'),
                    render: text => {
                        let q = [];
                        // console.log(typeof(q));
                        for (const i of text) {
                            // eslint-disable-next-line
                            q.push(<a key={i.name} href="javascript:">{i.name} </a>);
                        }
                        return q
                    }
                }
            ]
        }
    }

    modal_search() {
        for (const i of data_source) {
            // console.log(this.state.modal_source);
            // console.log(i);
            if (i['title'] === this.state.modal_source) {
                // console.log(i);
                let writers = '', casts = '';
                for (const t of i['writers']) {
                    // console.log(t);
                    writers += '<p>' + t.name + '</>'
                }
                for (const t of i['casts']) {
                    // console.log(t);
                    casts += '<p>' + t.name + '</>'
                }
                this.setState({
                    modal_visible: false,
                    modal_source: '',
                    modal_title: i['title'],
                    modal_poster: i['poster'],
                    modal_casts: casts,
                    modal_countries: i['countries'],
                    modal_languages: i['languages'],
                    modal_pubdate: i['pubdate'],
                    modal_summary: i['summary'],
                    modal_year: i['year'],
                    modal_writers: writers,
                    modal_directors: i['directors'][0].name,
                    modal_rating: Number(i['rating']['average']),
                    modal_duration: Number(i['duration'])
                }, () => {
                    // console.log(this.state);
                    this.setState({modal_visible: true})
                })
            }

        }
    }

    get_films_source() {
        if (data_source) {
            message.success('数据读取成功');
            let data = [];
            let x = 0;
            let average_rating = 0, ratingcut = 0;
            let average_duration = 0, durationcut = 0;
            // console.log(typeof(q));
            for (const i of data_source) {
                // eslint-disable-next-line
                data_source[x]['key'] = x + 1;
                // console.log(x,data_source[x]);
                // i.push({key:x});
                if (!isNaN(Number(data_source[x]['rating']['average']))) {
                    average_rating += Number(data_source[x]['rating']['average']);
                    ratingcut += 1
                }
                if (!isNaN(Number(data_source[x]['duration']))) {
                    average_duration += Number(data_source[x]['duration']);
                    durationcut += 1
                }
                data.push(i);
                // console.log(q);
                // console.log(x,average_duration,average_rating);
                x++;
            }
            average_rating /= ratingcut;
            average_duration /= durationcut;
            this.setState({data, average_duration, average_rating})

            // for(const i in data_source){
            //   console.log(data_source[i])
            // }
        } else {
            message.error('数据读取失败')
        }
        // console.log((data_source))
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
                        <PageHeader
                            // onBack={() => null}
                            title="Web作业2"
                            subTitle="电影一览"
                        />
                        <CenterLayout span={20}>
                            <Form>
                                {this.state.loadDown ?
                                    (
                                        <Form.Item>
                                            <Table columns={this.state.columns} dataSource={this.state.data}
                                                   pagination={{
                                                       pageSize: 10,
                                                       showSizeChanger: true,
                                                       pageSizeOptions: ['10', '20', '50', '100', '200'],
                                                       hideOnSinglePage: true
                                                   }}
                                                   scroll={{x: 900, y: 540}}/>
                                        </Form.Item>
                                    ) : null}
                            </Form>
                        </CenterLayout>
                        <Modal visible={this.state.modal_visible}
                               footer={null}
                               onCancel={() => {
                                   this.setState({modal_visible: false})
                               }}
                               closable={false}
                               destroyOnClose={true}
                               width={1000}>
                            <h2 text-align="center" style={{text_align: 'center'}}>{this.state.modal_title}</h2>
                            <div style={{background: '#ECECEC', padding: '30px'}}>

                                <Row gutter={24}>
                                    <Col span={8}>
                                        <Card
                                            hoverable
                                            style={{width: 280}}
                                            cover={<img src={this.state.modal_poster} width={200} alt={''}
                                                        referrerPolicy={'never'}/>}>
                                            <Meta
                                                title={this.state.modal_title}
                                                description={'地区:' + this.state.modal_countries + '   ' + '   ' + '语种:' + this.state.modal_languages}
                                            />
                                        </Card>
                                        &nbsp;
                                        {this.state.modal_rating > 1 ? (
                                                <Card
                                                    title={"评分:" + this.state.modal_rating}
                                                    bordered={false}>
                                                    {this.state.modal_rating - this.state.average_rating > 0 ? (
                                                        <Statistic
                                                            title={"高于平均分"}
                                                            value={this.state.modal_rating - this.state.average_rating}
                                                            precision={3}
                                                            valueStyle={{color: '#3f8600'}}
                                                            prefix={<Icon type="arrow-up"/>}
                                                        />) : <Statistic
                                                        title={"低于平均分"}
                                                        value={this.state.modal_rating - this.state.average_rating}
                                                        precision={3}
                                                        valueStyle={{color: '#cf1322'}}
                                                        prefix={<Icon type="arrow-down"/>}
                                                    />}
                                                </Card>) :
                                            (<Card
                                                title={'暂无评分'}
                                                bordered={false}>
                                            </Card>)}
                                        &nbsp;
                                        {this.state.modal_rating > 1 ? (
                                                <Card
                                                    title={"持续时长:" + this.state.modal_duration}
                                                    bordered={false}>
                                                    {this.state.modal_duration - this.state.average_duration > 0 && this.state.modal_duration > 1 ? (
                                                        <Statistic
                                                            title={"高于平均时长"}
                                                            value={this.state.modal_duration - this.state.average_duration}
                                                            precision={3}
                                                            valueStyle={{color: '#3f8600'}}
                                                            prefix={<Icon type="arrow-up"/>}
                                                        />) : <Statistic
                                                        title={"低于平均时常"}
                                                        value={this.state.modal_duration - this.state.average_duration}
                                                        precision={3}
                                                        valueStyle={{color: '#cf1322'}}
                                                        prefix={<Icon type="arrow-down"/>}
                                                    />}
                                                </Card>) :
                                            (<Card
                                                    title={'暂无时长'}
                                                    bordered={false}>
                                                </Card>
                                            )}
                                    </Col>
                                    <Col span={8}>
                                        <p>
                                            <Card title="导演">
                                                <div dangerouslySetInnerHTML={{__html: this.state.modal_directors}}/>
                                            </Card>
                                        </p>
                                        {this.state.modal_casts.length > 1 ? (
                                            <p>
                                                <Card title="主演">
                                                    <div dangerouslySetInnerHTML={{__html: this.state.modal_casts}}/>
                                                </Card>
                                            </p>
                                        ) : null}
                                        {this.state.modal_writers.length > 1 ? (
                                            <p>
                                                <Card title="剧本"><p
                                                    dangerouslySetInnerHTML={{__html: this.state.modal_writers}}/>
                                                </Card>
                                            </p>
                                        ) : null}
                                    </Col>
                                    <Col span={8}>
                                        {this.state.modal_pubdate.length > 1 ? (
                                            <p>
                                                <Card title="发布日期">
                                                    <div dangerouslySetInnerHTML={{__html: this.state.modal_pubdate}}/>
                                                </Card>
                                            </p>
                                        ) : null}

                                        {this.state.modal_summary.length > 1 ? (
                                            <p>
                                                <Card title="简介">
                                                    <div dangerouslySetInnerHTML={{__html: this.state.modal_summary}}/>
                                                </Card>
                                            </p>
                                        ) : null}
                                    </Col>
                                </Row>
                            </div>
                        </Modal>
                        <Footer style={{textAlign: 'center'}}>
                            Copyright ©2019 Created by 张智源 1652782
                        </Footer>
                    </FixedRow>
                </FixedLayout>
            </LocaleProvider>
        );
    }
}

export default App;
