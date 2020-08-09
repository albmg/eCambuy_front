<template>
  <v-container>
    <div v-for="(message, idx) in messages" :key="idx" class="mb-2">
      <div>
        <v-card>
          <v-card-subtitle
            >{{ message.userId.username }} a las
            {{ new Date(message.date) }} dice:
          </v-card-subtitle>
          <v-card-title>{{ message.text }}</v-card-title>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Chat',
  data() {
    return {
      messages: [],
    }
  },
}
</script>
