package com.example.watermap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = "http://localhost:3000")
public class WatermapApplication {

	//  ./mvnw spring-boot:run in the parent directory to run
	public static void main(String[] args) {
		SpringApplication.run(WatermapApplication.class, args);
	}

}
