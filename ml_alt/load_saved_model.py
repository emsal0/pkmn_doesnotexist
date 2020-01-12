import tensorflow as tf
import numpy as np
import imageio
import matplotlib.pyplot as plt

# imported_gen_model = tf.saved_model.load("generator_model/")
imported_gen_model = tf.saved_model.load("fashion_generator_model/")
# print(imported_gen_model.signatures)
noise = tf.random.normal([20, 100])
generated_images = imported_gen_model(noise)
fig = plt.figure()
for i in range(generated_images.shape[0]):
    plt.imshow(generated_images[i,:,:,0] * 127.5 + 127.5, cmap='gray')
    plt.axis('off')
    plt.savefig('images/image%d.png' %(i))
print(generated_images)
# print(imported_gen_model.output_shape)
