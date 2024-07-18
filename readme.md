# Hybrid Privacy Preservation for Location-Based Advertisement

SafeDeals uses the [Geo-indistinguishability algorithm](https://arxiv.org/abs/1212.1984) for perturbing the actual location coordinates of users before sending them to the server. This helps in preserving the location privacy of users. The amount of perturbation is controlled by the privacy budget, computed
using the business density (number of businesses per sq km). With the help of perturbed coordinates and the area of retrieval specified by the
user, advertisements from nearby stores are shown to the user.

The [Chicago Grocery Stores](https://www.kaggle.com/datasets/chicago/chicago-grocery-stores-2013) dataset was used for testing the clustering feature. This dataset has information about 500 grocery stores. The k-means clustering algorithm is used to generate clusters. The distances between perturbed coordinates and centroids of clusters are computed on the server to select the nearby stores.

<h4>Businesses can</h4>

- Post advertisements
- Get statistical information like the number of users interested in their offers for planning business strategies

<h4>Additional Privacy Aspects</h4>

- To prevent privacy breaches via statistical data, noise is added to the results using the concept of differential privacy. The privacy budget controls the amount of noise added.
- The application is robust against localization attacks and map-matching attacks.

<h4>To start the app locally - </h4>

- `npm run dev` -> starts the server.
- Make sure that a local or production instance of MongoDB is up and running.
- Ensure to set up a local `.env` file (Refer [Example ENV](https://github.com/aayushhyadav/SafeDeals-Server/blob/release/1.0.0/exampleENV.txt)).
