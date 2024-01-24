<h1>Hello, {{ $username }}!</h1>

<h2>In this email you will find the username and password for your workers account</h2>

<p>
    <strong>Your username:</strong> {{ $username }}
</p>
<p>
    <strong>Your password:</strong> {{ $password }}
</p>

<p>Log-in now at <a href="localhost:5173/login">spaceful</a>.</p>

<p>Thank you for using our service!</p>