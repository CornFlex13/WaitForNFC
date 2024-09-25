<script setup>
import { useTheme } from 'vuetify'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import { useAuthStore } from '@/store/auth'
import 'vuetify/styles'


const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const isPasswordVisible = ref(false)

</script>

<template>
  <!-- eslint-disable vue/no-v-html -->

  <div class="auth-wrapper d-flex align-center justify-center pa-40">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
      style="background-color: #FFFF; color: #FFFF;">
    
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
          </div>
        </template>

        
        <v-card-title class="text-center" style="font-size: 29px;">
          🕵️‍♂️ CYBERCP CHECK 🕵️‍♂️ 
        </v-card-title>

       
      </VCardItem>

      <VCardText class="pt-1">
        <h5 class="text-h5 font-weight-semibold mb-1">
          come to class some times,or you’ll grow up wondering where your degree came from 👋🏻
        </h5>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.Username"
                label="📧 Username"
                type="Username  "
                
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="🔒 Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              
              <div class="d-flex align-center justify-space-between flex-wrap mt-5 mb-4">
              
                <a
                  class="ms-5 mb-1"
                  href="javascript:void(0)">
                  Forgot Password 🕵️
                  
                </a>            
              </div>
              
              <!-- login button -->
              <VBtn
                block
                color="black"
                type="submit"
                
              >
                Login
              </VBtn>
            </VCol>
            <VCol>
            </VCol>
            <VCol>
            </VCol>          
            <VCol>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
