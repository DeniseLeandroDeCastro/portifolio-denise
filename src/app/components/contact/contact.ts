import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {

  name = '';
  email = '';
  message = '';

  isSending = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  constructor(private http: HttpClient) {}

  sendMessage(): void {
    this.isSending.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    const formData = {
      name: this.name,
      email: this.email,
      message: this.message
    };

    this.http
      .post(
        'https://formspree.io/f/mbgjqqlv',
        formData,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      .subscribe({
        next: () => {
          this.name = '';
          this.email = '';
          this.message = '';

          this.isSending.set(false);

          this.successMessage.set(
            'Mensagem enviada com sucesso! Obrigada pelo contato.'
          );
        },

        error: (error) => {
          console.error('Erro ao enviar mensagem:', error);

          this.isSending.set(false);

          this.errorMessage.set(
            'Não foi possível enviar a mensagem. Tente novamente.'
          );
        }
      });
  }
}
