from __future__ import absolute_import, division, print_function, unicode_literals

import tensorflow as tf

import os
import time
import numpy as np
import glob
import matplotlib.pyplot as plt
import PIL
import imageio

from IPython import display

class CVAE(tf.keras.Model):
  def __init__(self, latent_dim):
    super(CVAE, self).__init__()
    self.latent_dim = latent_dim
    self.inference_net = tf.keras.Sequential(
      [
          tf.keras.layers.InputLayer(input_shape=(96, 96, 4)),
          tf.keras.layers.Conv2D(
              filters=32, kernel_size=3, strides=(2, 2), activation='relu'),
          tf.keras.layers.Conv2D(
              filters=64, kernel_size=3, strides=(2, 2), activation='relu'),
          tf.keras.layers.Flatten(),
          # No activation
          tf.keras.layers.Dense(latent_dim + latent_dim),
      ]
    )

    self.generative_net = tf.keras.Sequential(
        [
          tf.keras.layers.InputLayer(input_shape=(latent_dim,)),
          tf.keras.layers.Dense(units=12*12*32, activation=tf.nn.relu),
          tf.keras.layers.Reshape(target_shape=(12, 12, 32)),
          tf.keras.layers.Conv2DTranspose(
              filters=64,
              kernel_size=3,
              strides=(2, 2),
              padding="SAME",
              activation='relu'),
          tf.keras.layers.Conv2DTranspose(
              filters=64,
              kernel_size=3,
              strides=(2, 2),
              padding="SAME",
              activation='relu'),
          tf.keras.layers.Conv2DTranspose(
              filters=32,
              kernel_size=3,
              strides=(2, 2),
              padding="SAME",
              activation='relu'),
          # No activation
          tf.keras.layers.Conv2DTranspose(
              filters=4, kernel_size=3, strides=(1, 1), padding="SAME"),
        ]
    )

  @tf.function
  def sample(self, eps=None):
    if eps is None:
      eps = tf.random.normal(shape=(100, self.latent_dim))
    return self.decode(eps, apply_sigmoid=True)

  def encode(self, x):
    mean, logvar = tf.split(self.inference_net(x), num_or_size_splits=2, axis=1)
    return mean, logvar

  def reparameterize(self, mean, logvar):
    eps = tf.random.normal(shape=mean.shape)
    return eps * tf.exp(logvar * .5) + mean

  def decode(self, z, apply_sigmoid=False):
    logits = self.generative_net(z)
    if apply_sigmoid:
      probs = tf.sigmoid(logits)
      return probs

    return logits

train_image_data = np.load('pokemon_sprites/black-white/pkmn_sprites.npy')
train_images = train_image_data.reshape(train_image_data.shape[0], 96, 96, 4).astype('float32')

# Normalizing the images to the range of [0., 1.]
train_images /= 255.

# get all the fire pokemon


# Binarization
train_images[train_images >= .5] = 1.
train_images[train_images < .5] = 0.

a = [4,5,6,37,38,58,59,77,78,126,136,146,155,156,157,218,219,228,229,240,244,250,255,256,257,322,323,324,390,391,392,467,485,494,498,499,500,513,514,554,555,607,608,609,631,636]
for i in range(len(a)):
    if a[i] <= 201:
        a[i] -= 1
    else:
        a[i] -= 2

fire_pkmn = train_images[np.array(a), :, :, :]
# fire_pkmn = train_images[:, :, :, :]
# fire_pkmn_mean = np.mean(fire_pkmn, axis=1)
# fire_pkmn_cov = np.cov(fire_pkmn)

# fire_pkmn_sample = np.random.multivariate_normal(fire_pkmn_mean, fire_pkmn_cov)

x = CVAE(latent_dim=50)
x.load_weights(filepath='vae_model/d')
y = x.encode(fire_pkmn)
# print(y[0].shape)

zm = np.mean(y[0], axis=0)
zc = np.cov(np.transpose(y[0]))
print(zc, zc.shape)
z = np.random.multivariate_normal(zm, zc).reshape(1, -1).astype('float32')
# print(z)

zv = np.mean(y[1], axis=0)
zvv = np.cov(np.transpose(y[1]))
zzv = np.random.multivariate_normal(zv, zvv).reshape(1, -1).astype('float32')
print(z)
print (z.shape)

# print(y, y.size)
zt = tf.convert_to_tensor(z)
# print(zt, zt.size)

decoded = x.decode((tf.convert_to_tensor(z), tf.convert_to_tensor(zzv)))
decoded = x.sample()
fig = plt.figure()
plt.imshow(decoded[0])
plt.show()
# input()
