<?php
include_once 'ManageDB.php';
class GetData{
	public function getAll(){
    	$queries = new ManageBD();//tiene la conección a la bd
    	$queries_res = $queries->getQueries();//trae la query a la BD
		foreach($queries_res as $key => $res){
			$data[$key]=[];
    	while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
			$data[$key][]= $row;
		}
	   }
	   //print_r($data);
		return $data;
	 }
	}
	/*echo "<pre>";
	print_r($data);
	echo "</pre>";*/
?>
