<template>
  <div class="pagination" v-show="pagination.total>0">
    <p class="total fl">
      共{{pagination.total}}条记录，第{{pagination.pageNum}}/{{pagination.maxPage}}页
    </p>
    <el-pagination class="fr" background
      :disabled="disabled"
      layout="prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="pagination.pageSize"
      :current-page="pagination.pageNum"
      :total="pagination.total"
      prev-text="上一页"
      next-text="下一页">
    </el-pagination>
  </div>
</template>

<script>
  import xhr from '../api/axiosConfig';

  export default {
    name: 'pagination',
    props: {
      // 区分数据的结构层次，有的是res.data，有的是res.data.data
      type: 0,
      pagination: {
        type: Object,
        default: function () {
          return {
            //当前页码
            pageNum: 1,
            //每页显示的自然数
            pageSize: 10,
            //总数据条数
            total: 0,
            maxPage: 0,
            //请求地址
            url: '',
            //请求类型
            method: 'post',
            //其它请求参数
            params: {}
          };
        }
      },
    },
    data() {
      return {
        disabled: false
      }
    },
    watch: {
      pagination: {
        handler(newVal) {
          let remainder = newVal.total % newVal.pageSize;
          let number = parseInt(newVal.total / newVal.pageSize);
          this.pagination.maxPage = remainder > 0 ? number + 1 : number;
        },
        deep: true
      }
    },
    created() {
      let remainder = this.pagination.total % this.pagination.pageSize;
      let number = parseInt(this.pagination.total / this.pagination.pageSize);
      this.pagination.maxPage = remainder > 0 ? number + 1 : number;
    },
    methods: {
      paginationRequest: function (config, params) {
        this.disabled = true;
        let vm = this;
        xhr.request(config).then(res => {
          if (this.type == 1) {
            let data = res.data;
            this.pagination.total = data.total
            let result = data.listData;
            let newPagination = {
              pageNum: this.pagination.pageNum,
              pageSize: this.pagination.pageSize,
              total: this.pagination.total,
              url: this.pagination.url,
              method: this.pagination.method || 'post',
              params: params
            };
            this.$emit('changePage', {
              tableData: result,
              pagination: newPagination
            })
          } else {
            let data = res.data.data
            this.pagination.total = data.total
            let result = res.data.data.listData
            let newPagination = {
              pageNum: this.pagination.pageNum,
              pageSize: this.pagination.pageSize,
              total: this.pagination.total,
              url: this.pagination.url,
              method: this.pagination.method || 'post',
              params: params
            }
            this.$emit('changePage', {
              tableData: result,
              pagination: newPagination
            })
          }
          this.disabled = false;
        }).catch(function (err) {
          vm.disabled = false;
        });
      },
      /**
       * 修改每页显示的数据条数
       * @param pageSize 每页显示的条数
       */
      handleSizeChange(pageSize) {
        let pagination = this.pagination;
        pagination.pageSize = pageSize;
        let params = pagination.params;
        params.pageSize = pageSize;
        let config = {
          url: pagination.url,
          method: pagination.method || 'post'
        };
        if (config.method === 'get') {
          config.params = params;
        } else {
          config.data = params;
        }
        this.paginationRequest(config, params);
      },
       /**
       * 页码跳转
       * @param pageNum 当前页码
       */
      handleCurrentChange(pageNum) {
        let pagination = this.pagination;
        pagination.pageNum = pageNum;
        let params = pagination.params;
        params.pageNum = pageNum;
        params.pageSize = pagination.pageSize;
        let config = {
          url: pagination.url,
          method: pagination.method || 'post'
        };
        if (config.method === 'get') {
          config.params = params;
        } else {
          config.data = params;
        }
        this.paginationRequest(config, params);
      }
    }
  };
</script>

<style scoped lang="scss">

</style>
