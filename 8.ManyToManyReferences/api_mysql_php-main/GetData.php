<?php
include_once 'ManageDB.php';
class GetData{
	public function getAll(){
    	$queries = new ManageBD();
    	$queries_res = $queries->getQueries();//trae la query a la BD
		foreach($queries_res as $key => $res){
			$data[$key]=[];
    	while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
			$data[$key][]= $row;
		}
	   }
		return $data;
	 }
	}
	/*echo "<pre>";
	print_r($keys);
	echo "</pre>";*/
?>
