/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/************************************************************************
 * Implementation code for procedure - 'procedure1'
 *
 *
 * @return - invocationResult
 */
 
var procedure1Statement = WL.Server.createSQLStatement("SELECT * FROM userdetails  WHERE userid = ? AND pwd = ? LIMIT 1");
function procedure1(param1, param2) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure1Statement,
		parameters : [param1, param2]
	});
}

/************************************************************************
 * Implementation code for procedure - 'procedure2'
 *
 *
 * @return - invocationResult
 */
 var procedure2Statement =  WL.Server.createSQLStatement("SELECT * FROM bikedetails");
function procedure2(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure2Statement,
		parameters : [param]
	});
}


var procedure3Statement =  WL.Server.createSQLStatement("INSERT INTO userdetails(userid, pwd) values (?,?)");
function procedure3(param1,param2) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure3Statement,
		parameters : [param1, param2]
	});
}

var procedure4Statement = WL.Server.createSQLStatement("SELECT * FROM userdetails");
function procedure4(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure4Statement,
		parameters : [param]
	});
}

var procedure5Statement = WL.Server.createSQLStatement("SELECT * FROM bikedetails where ownerid = ?");
function procedure5(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure5Statement,
		parameters : [param]
	});
}

var addNewBikeStatement =  WL.Server.createSQLStatement("INSERT INTO bikedetails (biketype,ownerid,price,descp,availableDate,title) values (?,?,?,?,?,?)");
function addNewBike(biketype,ownerid,price,descp,availableDate,title) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : addNewBikeStatement,
		parameters : [biketype,ownerid,price,descp,availableDate,title]
	});
}

var deleteBikeStatement =  WL.Server.createSQLStatement("DELETE FROM bikedetails WHERE bikeid=?");
function deleteBike(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : deleteBikeStatement,
		parameters : [param]
	});
}