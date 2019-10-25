import { i18n, nickname } from '@ecomplus/utils'
import EcomPassport from '@ecomplus/passport-client'
import EcAddressForm from '../EcAddressForm.vue'
import EcAddresses from '../EcAddresses.vue'
import EcAccountForm from '../EcAccountForm.vue'
import EcIdentify from '../EcIdentify.vue'
import EcOrdersList from '../EcOrdersList.vue'
import {
  Addresses,
  Registration,
  Orders,
  HelloAgain,
  IsNotYou,
  Logout
} from './../../lib/i18n'

export default {
  name: 'EcAccount',

  components: {
    EcIdentify,
    EcAddresses,
    EcAddressForm,
    EcAccountForm,
    EcOrdersList
  },

  props: {
    customer: {
      type: Object,
      default: () => { }
    },
    ecomPassport: {
      type: Object,
      default: () => new EcomPassport()
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
        Addresses,
        Registration,
        Orders,
        HelloAgain,
        IsNotYou,
        Logout
      }
    },
    localCustomer: {
      get () {
        return this.customer
      },
      set (customer) {
        this.$emit('update:customer', customer)
      }
    },
    nickname () {
      return nickname(this.localCustomer)
    }
  },

  methods: {
    i18n (label) {
      return i18n(this.dictionary[label])
    },

    login (ecomPassport) {
      if (ecomPassport.isLogged()) {
        this.localCustomer = ecomPassport.getCustomer()
        this.$emit('login', ecomPassport)
      }
    },

    logout () {
      this.ecomPassport.logout()
      if (!this.ecomPassport.isLogged()) {
        this.isUserIdentified = false
      }
    }
  },

  watch: {
    customerEmail (email) {
      if (email) {
        this.localCustomer = this.customer
        this.$emit('update:customer', this.localCustomer)
        this.isUserIdentified = true
      }
    }
  }
}
