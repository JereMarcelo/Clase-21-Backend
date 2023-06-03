async function purchase(cartId) {
    Event.preventDefault()
    console.log("purchase")
    try {
      const response = await fetch(`/api/carts/${cartId}/purchase`, {
        method: 'POST'
      });
      if (response.ok) {

        window.location.href = '/purchase';
      } else {
        console.log("Error", response)
        throw new Error('Failed to purchase');
      }
    } catch (error) {
      console.error(error);
    }
  }