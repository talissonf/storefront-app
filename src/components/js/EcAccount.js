import { i18n } from '@ecomplus/utils'
import EcIdentify from '../EcIdentify.vue'
import EcAddressForm from '../EcAddressForm.vue'
import EcAddresses from '../EcAddresses.vue'
import EcAccountForm from '../EcAccountForm.vue'

export default {
  name: 'EcAccount',

  components: {
    EcIdentify,
    EcAddresses,
    EcAddressForm,
    EcAccountForm
  },

  props: {
    customer: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      customerEmail: this.customer.main_email,
      isUserIdentified: Boolean(this.customer.main_email)
    }
  },

  computed: {
    dictionary () {
      return {
      }
    },

    localCustomer: {
      get () {
        return this.customer
      },
      set (customer) {
        this.editAccount = false
        this.$emit('update:customer', customer)
      }
    }
  },

  methods: {
    i18n (label) {
      return i18n(this.dictionary[label])
    },

    login (ecomPassport) {
      if (ecomPassport.isLogged()) {
        this.customerEmail = ecomPassport.getCustomer().main_email
        this.$emit('login', ecomPassport)
      }
    }
  }
}
