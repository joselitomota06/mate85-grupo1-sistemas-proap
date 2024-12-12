package br.ufba.proap.authentication.domain;

public enum PerfilEnum {
    ADMIN("Admin");

    private String name;

    PerfilEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
