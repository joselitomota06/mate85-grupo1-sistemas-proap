package br.ufba.proap.authentication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufba.proap.authentication.domain.Perfil;
import br.ufba.proap.authentication.domain.dto.ProfileDTO;
import br.ufba.proap.authentication.service.PerfilService;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    private PerfilService perfilService;

    @GetMapping("/list")
    public ResponseEntity<List<ProfileDTO>> getAll() {
        List<Perfil> perfis = perfilService.findAll();
        List<ProfileDTO> perfisDTO = perfis.stream()
                .map(perfil -> new ProfileDTO(
                        perfil.getName(),
                        perfil.getPermissions().stream()
                                .map(permission -> permission.getKey()).toList()))
                .toList();
        return ResponseEntity.ok(perfisDTO);
    }
}
