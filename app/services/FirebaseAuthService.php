<?php

namespace App\Services;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;

class FirebaseAuthService {

    const KEYS_URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';

    /**
     * Verifica e decodifica o ID Token do Firebase.
     * @param string $idToken
     * @return object|null Payload do token em caso de sucesso, null em caso de erro.
     */
    public function verifyIdToken(string $idToken): ?object {
        try {
            // Em produção real, você deve fazer cache (ex: em arquivo ou APCu) destas chaves
            // baseando-se no cabeçalho Cache-Control da resposta do Google para não
            // atrasar o login com requisições HTTP repetitivas.
            $keysJson = file_get_contents(self::KEYS_URL);
            $keys = json_decode($keysJson, true);

            $projectId = $_ENV['FIREBASE_PROJECT_ID'] ?? '';
            
            if (!$projectId) {
                throw new Exception("FIREBASE_PROJECT_ID não configurado no .env");
            }

            // Precisamos converter os certificados PEM em chaves públicas compatíveis com firebase/php-jwt
            $publicKeys = [];
            foreach ($keys as $kid => $pem) {
                $publicKeys[$kid] = new Key($pem, 'RS256');
            }

            // O JWT decodifica, verifica a assinatura, e garante que não expirou
            $decoded = JWT::decode($idToken, $publicKeys);

            // Verificações adicionais do Firebase
            if ($decoded->aud !== $projectId) {
                throw new Exception("Audience inválido.");
            }

            if ($decoded->iss !== 'https://securetoken.google.com/' . $projectId) {
                throw new Exception("Issuer inválido.");
            }

            if (empty($decoded->sub)) {
                throw new Exception("Subject (UID) inválido.");
            }

            return $decoded;

        } catch (Exception $e) {
            // Logar o erro internamente
            error_log("Erro de validação Firebase Token: " . $e->getMessage());
            return null;
        }
    }
}
