<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
    <form name="f" action="/main/insertTrainer" method="post">
        <table>
            <tbody>
                <tr>
                    <td>email:</td>
                    <td><input type="text" name="email" value=""></td>
                </tr>
                <tr>
                    <td>nickname:</td>
                    <td><input type="text" name="nickname" value=""></td>
                </tr>
                <tr>
                    <td>password:</td>
                    <td><input type="text" name="password" value=""></td>
                </tr>
                <tr>
                    <td>authority:</td>
                    <td><input type="text" name="authority" value=""></td>
                </tr>
                <tr>
                    <td colspan="2"><input name="submit" type="submit" value="Join"></td>
                </tr>
            </tbody>
        </table>
        <input type="hidden"  name="${_csrf.parameterName}"   value="${_csrf.token}"/>
    </form>
</body>
</html>