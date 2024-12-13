package br.ufba.proap.authentication.domain;

public enum PerfilEnum {
    ADMIN("admin"),
    COMUM("comum");

    private String name;

    PerfilEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
