import get_pokemon
import matplotlib.pyplot as plt
import random

fig = plt.figure(figsize=(5,5))
CHOICES = ['water', 'fire', 'grass', 'psychic', 'ghost', 'dark']
for i in range(25):
    plt.subplot(5, 5, i+1)
    prediction = get_pokemon.get_img([random.choice(CHOICES)])
    plt.imshow(prediction)
    plt.axis('off')
    
plt.savefig('demo.png')
plt.show()
