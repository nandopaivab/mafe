<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - MaFê Kids ERP</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .login-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
            overflow: hidden;
            width: 100%;
            max-width: 450px;
            padding: 40px;
            border: 1px solid rgba(255,255,255,0.5);
        }
        .brand {
            font-size: 2rem;
            font-weight: 800;
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
        }
        .brand span { color: #e74c3c; }
        .form-control {
            border-radius: 10px;
            padding: 12px 15px;
            border: 1px solid #ddd;
        }
        .form-control:focus {
            box-shadow: none;
            border-color: #3498db;
        }
        .btn-login {
            background: #2c3e50;
            color: white;
            border-radius: 10px;
            padding: 12px;
            font-weight: 600;
            transition: all 0.3s;
        }
        .btn-login:hover {
            background: #1a252f;
            color: white;
            transform: translateY(-2px);
        }
        .btn-google {
            background: white;
            color: #444;
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 12px;
            font-weight: 600;
            transition: all 0.3s;
        }
        .btn-google:hover {
            background: #f8f9fa;
            border-color: #ccc;
        }
        .btn-google img {
            width: 20px;
            margin-right: 10px;
        }
        #alertMessage { display: none; }
    </style>
</head>
<body>

    <div class="login-card">
        <div class="brand">MaFê <span>Kids</span></div>
        <p class="text-center text-muted mb-4">Bem-vindo ao ERP. Acesse sua conta.</p>

        <div id="alertMessage" class="alert alert-danger" role="alert"></div>

        <form id="loginForm">
            <div class="mb-3">
                <label class="form-label text-muted fw-bold">E-mail</label>
                <input type="email" id="email" class="form-control" required placeholder="seu@email.com">
            </div>
            <div class="mb-4">
                <label class="form-label text-muted fw-bold">Senha</label>
                <input type="password" id="password" class="form-control" required placeholder="••••••••">
            </div>
            <button type="submit" class="btn btn-login w-100 mb-3" id="btnSubmit">
                Entrar no Sistema
            </button>
        </form>

        <div class="text-center mb-3 text-muted fw-bold">OU</div>

        <button type="button" class="btn btn-google w-100" id="btnGoogle">
            <i class="fa-brands fa-google text-danger me-2"></i> Continuar com Google
        </button>
    </div>

    <!-- Firebase V10 Modular SDK -->
    <script type="module" src="/assets/js/firebase-auth.js"></script>

</body>
</html>
