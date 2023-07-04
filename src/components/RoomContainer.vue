<template>
  <div>
    <h1>Crear Sala</h1>

    <button @click="crearSala">Crear Sala</button>

    <div v-if="salaCreada">
      <h2>URL de la Sala:</h2>
      <p>{{ salaUrl }}</p>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  data() {
    return {
      salaCreada: false,
      salaUrl: ''
    };
  },
  methods: {
    crearSala() {
      const roomId = uuidv4();
      this.salaUrl = `http://localhost:8080/room/${roomId}`;
      this.salaCreada = true;
      localStorage.setItem('isAdmin', true);
    }
  }
};
</script>
