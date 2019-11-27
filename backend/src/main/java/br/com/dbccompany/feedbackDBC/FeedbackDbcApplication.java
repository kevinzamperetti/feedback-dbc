package br.com.dbccompany.feedbackDBC;

import br.com.dbccompany.feedbackDBC.Property.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication

@EnableConfigurationProperties( {
		FileStorageProperties.class
} )

public class FeedbackDbcApplication {

	public static void main(String[] args) {
		SpringApplication.run(FeedbackDbcApplication.class, args);
	}

}
