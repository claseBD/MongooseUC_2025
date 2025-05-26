import mongoose from 'mongoose';
import {getdata} from './api.js';
const { Schema, model } = mongoose;
let uri = 'mongodb://127.0.0.1:27017/uni_2025_ref_many_to_many_v1';

/*En este archivo se construye una relación mucho a mucho de todos con todos, sin filtrar ningún dato*/


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
      grades:[{}]
      });
   
      const instructorSchema = new mongoose.Schema({
        _id: Schema.Types.ObjectId,
         ID:{type:String},
         name:{type:String},
         dept_name:{type:String},
         salary:{type:mongoose.Types.Decimal128},
         activo:Boolean,
         phone_extensions:[{}]
         });
         const advisorSchema = new mongoose.Schema({
            s_ID: {type: Schema.Types.ObjectId, ref: 'student' },
            i_ID: {type: Schema.Types.ObjectId, ref: 'instructor'}
         });

      let Student =new mongoose.model('student', studentSchema);
      let Instructor =new mongoose.model('instructor', instructorSchema);
      let Advisor =new mongoose.model('advisor', advisorSchema);

      Object.keys(query.student).forEach(skey => { 
        
         Object.keys(query.instructor).forEach(ikey => { 

            console.log(skey," ",ikey)
         let mystudent = new Student({
            _id: new mongoose.Types.ObjectId(),
            ID: query.student[skey].ID,
            name:query.student[skey].name,
            dept_name: query.student[skey].dept_name,
            credits: query.student[skey].credits,
            //grades:JSON.parse(query.student[skey].grades)
            });
 
            //console.log("Este es el array que traes del api",query.instructor[ikey].phone_extensions);
        // console.log(JSON.parse(JSON.stringify(query.instructor[ikey].phone_extensions.replace(/['"]+/g, ''))));
         let  myinstructor = new Instructor({
             _id: new mongoose.Types.ObjectId(),
            ID: query.instructor[ikey].ID,
            name:query.instructor[ikey].name,
            dept_name: query.instructor[ikey].dept_name,
            salary: {
               "$numberDecimal": query.instructor[ikey].salary
             },
             activo: query.instructor[ikey].activo,
             //phone_extensions:JSON.parse(JSON.stringify((query.instructor[ikey].phone_extensions.replace(/['"]+/g, '')).split(",")))
           });
            //console.log(mystudent);
            //console.log(myinstructor);
         let advisor_ref = new Advisor({
             s_ID: mystudent._id,
             i_ID: myinstructor._id,
          });
          try {
            mystudent.save();
            myinstructor.save();
            advisor_ref.save();
        } catch (e) {
           console.log('Some error');
           console.log(e);
           process.exit(0);
          }
       });
     });
 
   