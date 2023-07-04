<template>
  <div>
    <h1>Totem Express</h1>    
    <button v-if="isAdmin && connected && !canPlay" @click="launchGame">Start Game</button>
    
    
    <p v-else-if="timer > 0">Tiempo restante: {{ timer }}</p>
    <div v-else-if="timer == 0">
      <button class="totem" v-if="isWinner == false" @click="sendTouchedTotem">Totem</button>
      <p v-else>Winner {{ winner }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      socket: null,
      connected: false,
      canPlay: false,
      showWinner: false,
      winner: '',
      timer: -1,
      isTimerRunning: false,
      isWinner: false,
      isAdmin: false,
    };
  },
  mounted() {
    this.connectWebSocket()
  },
  methods: {
    connectWebSocket() {
      this.isAdmin = localStorage.getItem('isAdmin');

      this.socket = new WebSocket('wss://riubo5yuf6.execute-api.eu-west-1.amazonaws.com/production');

      this.socket.onopen = () => {
        console.log('WebSocket connection opened');
        this.connected = true;
      };

      this.socket.onmessage = event => {
        const message = JSON.parse(event.data);
        if (message.action == 'launchGame') {
          this.canPlay = true;
          this.timer = message.data; 
          this.startGame()
        } else if (message.action == 'winner') {
          this.isWinner = true,
          this.winner = message.data.winner;
        }
      };

      this.socket.onclose = () => {
        console.log('WebSocket connection closed');
        this.connected = false;
        this.canPlay = false;
        this.showWinner = false;
        this.winner = '';
      };
    },
    launchGame() {
      const signal = {
        action: 'launchGame',
        data: 5,
      };
      this.socket.send(JSON.stringify(signal));
    },
    startGame() {
      this.startTimer();
    },
    startTimer() {
      this.isTimerRunning = true;
      const intervalId = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          this.stopTimer();
         
        }
      }, 1000);
      this.intervalId = intervalId;
    },
    stopTimer() {
      this.isTimerRunning = false;
      clearInterval(this.intervalId);
    },
    resetTimer() {
      this.timer = 0;
      this.stopTimer();
    },
    sendTouchedTotem() {
       const eventData = {
        action: 'totem_touched',
      };
      this.socket.send(JSON.stringify(eventData));
    }
  }
};
</script>


<style>
.totem {
  /* Estilos para hacer el botón más grande */
  padding: 100px 60px;
  font-size: 18px;
  /* Estilos para cambiar el color del botón */
  background-color: #ff7f50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.totem:hover {
  /* Estilos al pasar el cursor por encima del botón */
  background-color: #ff6347;
}
</style>