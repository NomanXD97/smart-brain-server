const handleRegister=(req,res,db,bcrypt)=>{

	const {name,email,password}=req.body;
	if(!name || !email || !password){

		return res.status(400).json('incorrect form submission');
	}

	// bcrypt.hash(password, null, null, function(err, hash) {
 //    // Store hash in your password DB.
 //    console.log(hash);
	// });

	const hash = bcrypt.hashSync(password);
	db.transaction(trx=>{
		trx.insert({

			hash : hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail=>{

				trx('users')
				.insert({

				email: loginEmail[0],
				name: name,
				joined: new Date()

				})
			.returning('*')
			.then(response=>res.json(response[0]))

			})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	
	.catch(err=>res.status(400).json('Failed to register'));

	// database.users.push({

	// 		id:"113",
	// 		name: name,
	// 		email:email,
	// 		password: password,
	// 		entries:0,
	// 		joined: new Date()


	// })

	//res.json(database.users[database.users.length-1]);
}

module.exports={
	handleRegister: handleRegister
};