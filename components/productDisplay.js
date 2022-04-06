app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: 
    //html
    `
        <div class="product-display">
            <div class="product-container">
                <div class="product-image">
                    <img :src="image">
                </div>
                <div class="product-info">
                    <h1>{{ product }}</h1>
                    <p v-if="inStocke">In Stock</p>
                    <p v-else>Out of Stock</p>
                    <p>Shipping: {{shipping}}</p>
                    <ul>
                        <li v-for="detail in details">{{ detail }}</li>
                    </ul>

                    <div v-for="(variant, index) in variants" 
                            :key="variant.id" 
                            @click="updateVariant(index)"
                            class="color-circle" 
                            :style="{backgroundColor: variant.color}">
                        </div>
                    <button class="button" 
                            :class="{disabledButton: !inStocke}" 
                            @click="addToCart"
                            :disabled="!inStocke">Add to Cart</button>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            product: 'Socks',
            selectedVariant: 0,
            details: ['50% cotton', '20% polyester', '30% wool'],
            variants: [
                {id: 2234, color: 'green', image: './assets/images/socks_green.jpeg', quantity: 50},
                {id: 2235, color: 'blue', image: './assets/images/socks_blue.jpeg', quantity: 0}
            ]
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStocke() {
            return this.variants[this.selectedVariant].quantity
        },
        shipping() {
            if(this.premium) {
                return 'Free'
            }
            return 2.99
        }
    }
}) 