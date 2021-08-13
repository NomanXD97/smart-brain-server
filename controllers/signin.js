const handleSignin=(req,res,db,bcrypt)=>{

	// // Load hash from your password DB.
	// bcrypt.compare("Bee", '$2a$10$j/ApXU35Ay5A4VMQNUkRMehnWky4npNBlvDi3G8nogxZ0yeq9x/NW', function(err, res) {
 //    console.log('first-guess',res);
	// });
	// bcrypt.compare("veggies", '$2a$10$j/ApXU35Ay5A4VMQNUkRMehnWky4npNBlvDi3G8nogxZ0yeq9x/NW', function(err, res) {
 //    console.log('Second-guess',res);
	// });

	const {email,password}=req.body;
	if(!email || !password){

	return res.status(400).json('incorrect form submission');
	}
	db.select('email','hash').from('login')
	.where('email','=',email)
	.then(data=>{

		const isvalid = bcrypt.compareSync(password,data[0].hash);
		if(isvalid){

			db.select('*').from('users')
			.where('email','=',email)
			.then(response=>{
				res.json(response[0])
			})
			.catch(err=>res.json('Unable to get user'))
		}else{
			res.json('Invalid credentials');

		}
	}).catch(err=>res.json('Unable to get user'));



	
		//res.status(400).json("Invalid Credentials...");
	
}

module.exports={

	handleSignin:handleSignin

};