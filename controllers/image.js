const Clarifai =  require('clarifai');

const app = new Clarifai.App({
 apiKey: '59f85ba38c6d4590a8389effb20473f0'
});

const handleApiCall=(req,res)=>{

app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
.then(data=>res.json(data))
.catch(err=>res.status(400).json('unable to work with API'));

}

const handleImage=(req,res,db)=>{

	const {id}=req.body;

	db('users').where('id','=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entry=>res.json(entry[0]))
 	.catch(err=>res.status(400).json("No Such usres"));

	// let found = false;

	// database.users.map(user=>{

	// 	if(id===user.id){
	// 		found=true;
	// 		user.entries++;
	// 		return res.json(user.entries);
	// 	}
		
	// })

	
	// if(found===false){
	// 		return res.status(400).json("Not found");
	// 	}
}

module.exports={

	handleImage:handleImage,
	handleApiCall:handleApiCall

}
