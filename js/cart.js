 new Vue({
	el:"#app",
	data:{
		totalMoney:0,
		productList:[],
		checkAllFlag:false,
		delFlag:false,
		curProduct:""
	},

	filters:{
		fomatMoney:function(value){
			return "￥"+value.toFixed(2);
		}
	},

	mounted:function(){
		this.$nextTick(function(){
			this.cartView();
		})
		
	},

	methods:{
		cartView:function(){			
			this.$http.get("data/cartData.json").then(res=>{
				this.productList=res.data.result.list;
				// this.totalMoney=res.data.result.totalMoney;
			});
		},
		changeMoney:function(product,way){
			if(way>0){
				product.productQuantity++;
			}else{
				product.productQuantity--;
				if(product.productQuantity<1){
					product.productQuantity=1;
				}
			}
			this.calcTotalprice();
		},
		selectedProduct:function(item){
			if(typeof item.checked=="undefined"){
				Vue.set(item,"checked",true);
				// this.$set(item,"checked",true)
			}else{
				item.checked=!item.checked;
			}
			this.calcTotalprice();
		},
		checkAll:function(flag){
			this.checkAllFlag=flag;
			var _this=this;
			this.productList.forEach(function(item,index){				
			if(typeof item.checked=="undefined"){				
				_this.$set(item,"checked",_this.checkAllFlag)
			}else{
				item.checked=_this.checkAllFlag;
			}
			})
			this.calcTotalprice();			
		},
		calcTotalprice:function(){
			var _this=this;
			this.totalMoney=0;	
			this.productList.forEach(function(item,index){					
				if(item.checked){
					_this.totalMoney+=item.productPrice*item.productQuantity;
				}
			})
		},
		delConfirm:function(item){
			this.delFlag=true;
			this.curProduct=item;
		},
		delProduct:function(){
			var index=this.productList.indexOf(this.curProduct);
			this.productList.splice(index,1)
			this.delFlag=false;
		}
	}
});
 Vue.filter("money",function(value,type){
 	return "￥"+value.toFixed(2)+type;
 })