<template>
    <div class="about">
        <search title="About Us" index="3"></search>
        <div class="title wrap1150">
            <h3>Team Member</h3>
            <p>Group members in TASSEL SCHOLAR are from different famous universities and corporations in the global,
                each of them has</p>
            <p>experiences for management, operation, technology, data analysis, business development to provide the
                best service for every user</p>
        </div>
        <div class="box wrap1150">
            <ul>
                <li v-for="(item,index) in aboutList" :key="index">
                    <div class="cont">
                        <img src="../../assets/images/service-blue.png" alt="">
                        <div>
                            <h4>{{item.name}} <span>{{item.role}}</span></h4>
                            <p>{{item.intro}}</p>
                        </div>
                    </div>
                    <div class="bg"></div>
                </li>
            </ul>
        </div>


    </div>
</template>

<script>
    import search from '../../components/search.vue'

    export default {
        name: 'about',
        data() {
            return {
                aboutList: [
                    {
                        name: 'Feng Yan',
                        role: 'Management',
                        img: '',
                        intro: 'Mr. Yan is the PhD of Biomedical Engineering at the University of Oklahoma, and he has been authorized more than 35 Chinese patents, and one of his scientific projects obtained ¥250000 organization cooperation in undergraduate university.He is responding to management and business development'
                    }, {
                        name: 'Rui Zhou',
                        role: 'Administration',
                        img: '',
                        intro: 'Ms. Zhou is the Master of Industry Engineering at the University of Tennessee, and she ever obtained silver prizes in two national entrepreneurship contests in China. She is responding to product operation and business administration'
                    }, {
                        name: 'Hang Ru',
                        role: 'Market',
                        img: '',
                        intro: 'Mr. Ru is the Master of Optical Engineering at Nanchang Hangkong University, and he ever competed market and data analysis of 5 national and provincial entrepreneurship projects. He is responding to market analysis and data statistics'
                    }, {
                        name: 'Hang Sheng',
                        role: 'Technology',
                        img: '',
                        intro: 'Mr. Sheng has 5 years software developing experience and now he the Master of Engineering Management in Xihua University, and he is very good at platform-developing of big data, HIS and Internet of things. He is responding to technological development and design'
                    }, {
                        name: 'Qipeng Lv',
                        role: 'Advisor',
                        img: '',
                        intro: 'Mr. Lv is the master of Southeast University in China,  and possessed 10+ years working experience in Intel as senior director in software, and hold an Intel patent for software encryption verification, as well as worked as advanced operation senior in iQiyi. He is responding to guide and develop business strategy and management'
                    }, {
                        name: 'Junjie Yang',
                        role: 'Operation',
                        img: '',
                        intro: 'Mr. Yang is the master of Shenzhen University in China,  and he ever obtained two second prizes in scientific contest of undergraduate and mathematic modeling contest of graduate in China. He is responding to product operation and function  development'
                    }, {
                        name: 'Yue Li',
                        role: 'Finance',
                        img: '',
                        intro: 'Ms. Li is the master of Sydney University in Australia,  and she ever obtained the outstanding prizes in national undergraduate  business contest in China and  in mathematic modeling contest of American. She has Chinese and international certificate  of accountant qualification and is responding to financial analysis and cost management.'
                    }
                ]
            }
        },
        components: {search},
    }
</script>

<style scoped lang="scss">
    .about {
        padding-bottom: 35px;
        background-color: #F6F8F9;
    }

    .title {
        background-color: #fff;
        width: auto;
        height: 270px;
        margin-bottom: -106px;
        h3,p{
            width: 1200px;
            margin: 0 auto;
        }
        h3 {
            height: 100px;
            line-height: 100px;
            font-size: 28px;
            color: #667C83;
        }
        p {
            line-height: 32px;
            font-size: 18px;
            color: #6A7884;
        }
    }

    .box {
        margin-top: 35px;
        li {
            width: 1155px;
            height: 214px;
            margin: 0 0 20px 0;
            position: relative;
            cursor: pointer;
            transition: height .2s ease-in-out;
            .bg {
                width: 1095px;
                height: 35px;
                background: url(../../assets/images/shodow.png) no-repeat center center;
                background-size: 100% 100%;
                position: absolute;
                top: 179px;
                left: 30px;
                transition: top .2s ease-in-out;
                z-index: 1;
            }
            &:hover {
                height: 244px;
                .bg {
                    top: 214px;
                }
                .cont div{
                    background:linear-gradient(242deg,rgba(48,124,149,1),rgba(66,50,109,1));
                    opacity:0.9;
                    color: #fff !important;
                    h4,p{
                        color: #fff;
                    }
                }
            }
            .cont {
                width: 100%;
                height: 214px;
                box-shadow: 0 5px 10px rgba(39, 91, 131, 0.18);
                display: flex;
                justify-content: flex-start;
                border-radius: 4px;
                position: relative;
                z-index: 10;
                background-color: #fff;
                img {
                    width: 222px;
                    height: 184px;
                    padding: 15px;
                }
                div {
                    width: 903px;
                    padding: 15px 80px 0 15px;
                    background-color: #fff;
                    transition: all .2s ease-in-out;
                }
                h4 {
                    height: 45px;
                    line-height: 32px;
                    font-size: 24px;
                    color: #33B2C5;
                    span {
                        font-size: 20px;
                        margin-left: 8px;
                    }
                }
                p {
                    line-height: 34px;
                    font-size: 18px;
                    color: #485764;
                }
            }
        }
    }
</style>


