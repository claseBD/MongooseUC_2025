import mongoose from 'mongoose';
import {getdata} from './api.js';
const { Schema, model } = mongoose;
let uri = 'mongodb://127.0.0.1:27017/uni_2025_ref_many_to_many';
/*En este archivo se construye una relación mucho a mucho de todos filtrando los datos según lo que tiene advisor en la base de datos original*/
//trayendo la data del api
const query = await getdata().then(data=> {
   //console.log(data);
   return data;
 }).catch(error => {
   console.log('no va');
   process.exit(0);
 });

const options = {
   autoIndex: false, // Don't build indexes
   maxPoolSize: 10, // Maintain up to 10 socket connections
   serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
   socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
   family: 4 // Use IPv4, skip trying IPv6
 };
  mongoose.connect(uri, options).then(
   () => { console.log('se ha conectado exitosamente')
      },
   err => { console.log('no se ha podido conectar') }
   );
   
   let defaultGrades = [{2017:{},2018:{},2019:{},2020:{}}];
   const studentSchema = new mongoose.Schema({
     _id: Schema.Types.ObjectId,
      ID:{type:String},
      name:{type:String},
      dept_name:{type:String},
      credits:{type:mongoose.Types.Decimal128},
      picture:Buffer,
      grades:[{}],
	  advisor: { type: Schema.Types.ObjectId, ref: 'advisor' }
      });
   
      const instructorSchema = new mongoose.Schema({
        _id: Schema.Types.ObjectId,
         ID:{type:String},
         name:{type:String},
         dept_name:{type:String},
         salary:{type:mongoose.Types.Decimal128},
         activo:Boolean,
         phone_extensions:[{}],
		 advisor: { type: Schema.Types.ObjectId, ref: 'advisor' }
         });
         const advisorSchema = new mongoose.Schema({
            s_ID: {type: Schema.Types.ObjectId, ref: 'student' },
            i_ID: {type: Schema.Types.ObjectId, ref: 'instructor'}
         });

	let Student =new mongoose.model('student', studentSchema);
	let Instructor =new mongoose.model('instructor', instructorSchema);
	let Advisor =new mongoose.model('advisor', advisorSchema);
	
	
	/*async function seedDatabase() {
	  for (let skey of Object.keys(query.student)) {
		for (let ikey of Object.keys(query.instructor)) {
		  for (let akey of Object.keys(query.advisor)) {
			if (
			  query.advisor[akey].s_ID === query.student[skey].ID &&
			  query.advisor[akey].i_ID === query.instructor[ikey].ID
			) {
			  const studentDoc = new Student({
				_id: new mongoose.Types.ObjectId(),
				ID: query.student[skey].ID,
				name: query.student[skey].name,
				dept_name: query.student[skey].dept_name,
				credits: query.student[skey].credits,
			  });

			  const instructorDoc = new Instructor({
				_id: new mongoose.Types.ObjectId(),
				ID: query.instructor[ikey].ID,
				name: query.instructor[ikey].name,
				dept_name: query.instructor[ikey].dept_name,
				salary: { $numberDecimal: query.instructor[ikey].salary },
				activo: query.instructor[ikey].activo,
			  });

			  const advisorDoc = new Advisor({
				s_ID: studentDoc._id,
				i_ID: instructorDoc._id,
			  });

			  try {
				await studentDoc.save();
				await instructorDoc.save();
				await advisorDoc.save();

				// Optional: link advisor ID to student/instructor
				studentDoc.advisor = advisorDoc._id;
				instructorDoc.advisor = advisorDoc._id;

				await studentDoc.save();
				await instructorDoc.save();
			  } catch (e) {
				console.error('Save error:', e.message);
				process.exit(1);
			  }
			}
		  }
		}
	  }
	}
	
	await seedDatabase();*/

/*Desde el lado del advisor*/
const advisor_p = await Advisor.findOne().populate('s_ID').populate('i_ID');
console.log(advisor_p.s_ID.name); // student name
console.log(advisor_p.i_ID.name); // instructor name

/*Desde el lado del estudiante*/
/*const student_p = await Student.findOne({ ID: '00128' }).populate('advisor');
const advisor = await Advisor.findById(student_p.advisor).populate('i_ID');
console.log(advisor_p.i_ID.name); // instructor name*/
		
 
    