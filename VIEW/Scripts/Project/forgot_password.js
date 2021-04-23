

//$('#btn_sendpassword').on('click', function () {
//    sendMail();
//})
function sendEmail() {
	Email.send({
		Host: "smtp.gmail.com",
		Username: "hantrungkien981@gmail.com",
		Password: "04091998Idd",
		To: 'hantrungkien98@gmail.com',
		From: "hantrungkien981@gmail.com",
		Subject: "Send password",
		Body: "123456",
	}).then(
		message => alert("mail sent successfully")
	);
}