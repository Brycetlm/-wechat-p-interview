const resumeService=require('../../services/resume.service');
const applyService=require('../../services/apply.service');
const positionService=require('../../services/position.service');
const companyService=require('../../services/company.service');

//获取用户简历信息，然后计算用户数据，例如用户期望的平均工资等
//获取职位信息（此处测试先取一个职位） 取职位时要用company_id到公司数据库获取公司信息，地区等
//将用户信息与职位信息做比较，算法给出推荐度评分


  var expectSalary=0;
  var wave=1500;

//获取用户简历信息
const getResumeInfo= async function (id) {
  let data = await resumeService.getResumeInfoByUserId(id); //调试时使用默认参数1
  let result=data.getResumeInfoByUserId;
  return result;
}

// console.log(this.getResumeInfo(1));
const calculate=  function (result) {
  
    //平均工资计算
    var sum_min=0;
    var sum_max=0;
    var i=0;
    for(i=0;i<result.length;i++)
    {
      sum_min=sum_min+result[i].salary_min;
      sum_max=sum_max+result[i].salary_max;
    }
   //console.log(sum_min);
    var average=(sum_min+sum_max)/result.length/2;
    expectSalary=average;
    //console.log(expectSalary);
}

//获取公司信息，主要是地区信息
const getCompanyInfo=async function(companyId)
{
  let comInfo=await companyService.getCompanyInfoById(companyId);
  comInfo=comInfo.getCompanyInfoById;
  //console.log(comInfo);
  let region=[];
  region.push({
    province:comInfo.province,
    city:comInfo.city,
    region:comInfo.region,
    name:comInfo.name,
  })
  return region;
}


//测试给出一个postion id
const match= async function (positionId) {


  
  //获取用户数据
  let result=await this.getResumeInfo(1);  //获取用户所有简历信息  这里默认是用户1  其实应该是登录的根据openid绑定的用户
  this.calculate(result);   //计算用户期望的平均工资


  //计算职位匹配度，主要是工资 这里默认给1
    let salary=await positionService.getPositionById(positionId);
    salary=salary.getPositionById;
    //console.log("salary");
    console.log(salary);
    let average_salary=(salary.salary_min+salary.salary_max)/2;
    var salary_loss=expectSalary-average_salary;    //期望工资与职位给出的工资只差，为正就loss越大，难以接受
    //console.log(salary_loss)

    //计算公司匹配，主要是地区
    let region=await getCompanyInfo(salary.company_id);  //公司所在地
   // console.log(region);
    var province_match=0;
    var city_match=0;
    var region_match=0;
    
    for(var i=0;i<result.length;i++)
    {
      //console.log(result[i].province);
      if(region[0].province==result[i].province){province_match=1;}
      if(region[0].city==result[i].city&&province_match){city_match=1;}
      if(region[0].region==result[i].region&&province_match&&city_match){region_match=1;}
    }
    // console.log(region[0].province);
    // console.log(salary.province);
    

    //评分，分愈高越契合职位
    var regionJudge=province_match*50+city_match*30+region_match*20;  
    var salaryJudge;
    if(salary_loss>wave){salaryJudge=10;}    //超出期望的波动范围则只为10分
    else if(salary_loss<=0){salaryJudge=100;}
    else{
      salaryJudge=(salary_loss/wave)*100;
    }
    //console.log(salaryJudge);
    //console.log(regionJudge);
    var judge=regionJudge*0.3+salaryJudge*0.7;  //最终评分
    //console.log(judge);
    let recommendJob=[];
    console.log(salary);
    recommendJob.push({
       

        company_name: region[0].name,
        name:salary.name,
        province:region[0].province,
        city: region[0].city,
        region: region[0].region,
        updated_at: salary.created_at,
        company_id:salary.company_id,
       
        
    })
    console.log(judge);
    if(judge>60){ console.log(recommendJob); return recommendJob;}
    else {return 0;}
}


module.exports = {
  getResumeInfo:getResumeInfo,
  calculate:calculate,
  match:match,
};