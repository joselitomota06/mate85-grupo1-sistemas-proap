package br.ufba.proap.security;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

class HashProvider {

    enum Algorithm {
        MD5("MD5"),
        SHA1("SHA-1"),
        SHA256("SHA-256"),
        SHA384("SHA-384"),
        SHA512("SHA-512");

        private String algorithmName;

        Algorithm(String algorithmName) {
            this.algorithmName = algorithmName;
        }

        public String getAlgorithmName() {
            return algorithmName;
        }
    }

    public static String hash(String key, Algorithm algorithm) {
        try {
            MessageDigest digest = MessageDigest.getInstance(algorithm.getAlgorithmName());
            byte[] hash = digest.digest(key.getBytes(StandardCharsets.UTF_8));
            return bytesToHex(hash);
        } catch (Exception e) {
            throw new RuntimeException("Error hashing the key", e);
        }
    }

    public static boolean verify(String key, String hash, Algorithm algorithm) {
        return hash(key, algorithm).equals(hash);
    }

    private static String bytesToHex(byte[] hash) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }

}
