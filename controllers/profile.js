const handleProfileGet=(req,res,db)=>{

	const {id}=req.params;

	db.select('*').from('users').where({id:id})
		.then(user=>{

			if(user.length)
			{
				res.json(user[0]);
			}

			else
			{
				res.status(400).json("Not found");
			}
		})
	// // let found = false;

	// // database.users.map(user=>{

	// // 	if(id===user.id){
	// // 		found=true;
	// // 		return res.json(user);
	// // 	}
		
	// })

	
	// if(found===false){
	// 		return res.status(400).json("Not found");
	// 	}
}

module.exports={

	handleProfileGet:handleProfileGet

};