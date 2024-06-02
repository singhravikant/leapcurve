class AdminController < ApplicationController
  def index
  end
def getDistnicValues
  @allFunctions=[]
  @allIndustry=[]
  @allCompanies=[]
  @allInstitute=[]
  @alldgree=[]
  @allCompanies,@allIndustry, @allFunctions,@allInstitute,@alldgree=getUniqueComFnIn()
  render json: {status:200,allFunctions:@allFunctions.sort,
                allIndustry:@allIndustry.sort,allInstitute:@allInstitute.sort,allCompanies:@allCompanies,alldgree:@alldgree}
end
  private
  def getUniqueComFnIn
    companyPath = $filePath+"companies.txt"
    indPath = $filePath+"industries.txt"
    funPath = $filePath+"functions.txt"
    clgPath = $filePath+"colleges.txt"
    degPath = $filePath+"degrees.txt"
    file = open(companyPath,'r')
    text = file.read
    file.close
    allcompanny=[];
    allcompanny = text.split("\n")
    file = open(indPath,'r')
    text = file.read
    file.close
    allInd=[];
    allInd = text.split("\n")
    file = open(funPath,'r')
    text = file.read
    file.close
    allFun=[];
    allFun = text.split("\n")
    file = open(clgPath,'r')
    text = file.read
    file.close
    allClg=[];
    allClg = text.split("\n")
    file = open(degPath,'r')
    text = file.read
    file.close
    alldgr=[];
    alldgr = text.split("\n")
    return allcompanny,allInd,allFun,allClg,alldgr
  end
end
