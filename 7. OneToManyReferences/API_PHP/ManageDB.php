<?php
include_once 'DB.php';
class ManageBD extends DB{
  public function getQueries(){
	
	$advisor = $this->connect()->query('SELECT * FROM advisor');
	$classroom =$this->connect()->query('SELECT * FROM classroom');
	$course=$this->connect()->query('SELECT * FROM course');
	$department=$this->connect()->query('SELECT * FROM department');
	$instructor=$this->connect()->query('SELECT * FROM instructor');
	$prereq=$this->connect()->query('SELECT * FROM prereq');
	$section=$this->connect()->query('SELECT * FROM section');
	$student=$this->connect()->query('SELECT * FROM student');
	$takes=$this->connect()->query('SELECT * FROM takes');
	$teaches=$this->connect()->query('SELECT * FROM teaches');
	$queries = array (
		"advisor"=>$advisor,
		"classroom"=>$classroom,
		"course"=>$course,
		"department"=>$department,
		"instructor"=>$instructor,
		"prereq"=>$prereq,
		"section"=>$section,
		"student"=>$student,
		"takes"=>$takes,
	    "teaches"=>$teaches
	);
	//echo "<pre>";
	//print_r($queries);
	//echo "</pre>";*/
		return $queries;
	
	}
}
?>