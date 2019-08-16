<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
	<title>Home</title>
</head>

<body onload="document.f.username.focus();">
    <h3>Customized Login Page HealthNote</h3>
    <form name="f" action="/main/login" method="post">
        <table>
            <tbody>
                <tr>
                    <td>User:</td>
                    <td><input type="text" name="username" value=""></td>
                </tr>
                <tr>
                    <td>Password:</td>
                    <td><input type="password" name="password"></td>
                </tr>
                <tr>
                    <td colspan="2"><input name="submit" type="submit" value="Login"></td>
                </tr>
            </tbody>
        </table>
		<input type="hidden"  name="${_csrf.parameterName}"   value="${_csrf.token}"/>
    </form>
</body>
</html>