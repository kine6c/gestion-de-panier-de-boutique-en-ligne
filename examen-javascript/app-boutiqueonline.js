//1
document.addEventListener("DOMContentLoaded", function() {
    const boutonsAjouterPanier = document.querySelectorAll(".butt-panier");
    const panierListe = document.getElementById("liste-panier");
    const totalPanier = document.getElementById("prixtotal");
    const inputFiltre = document.getElementById("filtreProduits");

    
//2
boutonsAjouterPanier.forEach(bouton => {
        bouton.addEventListener("click", ajouterProduitAuPanier);
    }); 
    

//3 
function ajouterProduitAuPanier() {
        const parentElement = this.parentElement;
        const quantite = parseInt(parentElement.querySelector(".nombre").value);
        const nomProduit = parentElement.querySelector("h2").innerText;
        const prixProduit = parseFloat(parentElement.querySelector(".prix").innerText.replace(" FR", ""));

        if (quantite > 0 && quantite <= 9) {
            ajouterAuPanier({ nom: nomProduit, quantite: quantite, prix: prixProduit });
            parentElement.querySelector(".nombre").value = 0;
        } else {
            alert("La quantité doit être comprise entre 1 et 9.");
        }
    }

 
//4
function ajouterAuPanier(produit) {
        let produitExistant = false;

        const produitsPanier = panierListe.querySelectorAll("li");
        produitsPanier.forEach(produitPanier => {
            const nomProduitPanier = produitPanier.querySelector("span.nom-produit").innerText;
            if (nomProduitPanier === produit.nom) {
                const quantitePanier = parseInt(produitPanier.querySelector("span.quantite").innerText);
                const nouvelleQuantite = Math.min(quantitePanier + produit.quantite, 9);
                produitPanier.querySelector("span.quantite").innerText = nouvelleQuantite;
                produitExistant = true;
            }
        });

        if (!produitExistant) {
            const nouveauProduit = creerElementProduit(produit);
            panierListe.appendChild(nouveauProduit);
        }

        const montantTotal = parseFloat(totalPanier.innerText.replace(" F CFA", ""));
        totalPanier.innerText = (montantTotal + produit.quantite * produit.prix).toFixed(2) + " F CFA";
    }

//5
function creerElementProduit(produit) {
        const nouveauProduit = document.createElement("li");
        nouveauProduit.innerHTML = `<span class="nom-produit">${produit.nom}</span> - Quantité: <span class="quantite">${produit.quantite}</span> - Prix total: ${produit.quantite * produit.prix} F CFA <button class="supprimer-produit" data-prix="${produit.quantite * produit.prix}">Supprimer</button>`;
        return nouveauProduit;
    }

//6 identifier les evenements de click pour supprimer
document.addEventListener("click", function(event) {
        if (event.target.classList.contains("supprimer-produit")) {  //si on clik sur un elmnt avec la classe
            const prixProduit = parseFloat(event.target.dataset.prix);
            const montantTotal = parseFloat(totalPanier.innerText.replace(" F CFA", ""));
            totalPanier.innerText = (montantTotal - prixProduit).toFixed(2) + " F CFA";
            event.target.parentElement.remove();
        }
    });

//7
inputFiltre.addEventListener("input", function() {
        const texteFiltre = this.value.trim().toLowerCase();
        filtrerProduits(texteFiltre);
    });

//8    
function filtrerProduits(texte) {
        const produits = document.querySelectorAll("#produits > div");

        produits.forEach(produit => {
            const nomProduit = produit.querySelector("h2").innerText.toLowerCase();
            if (nomProduit.includes(texte)) {
                produit.style.display = "block";
            } else {
                produit.style.display = "none";
            }
        });
    }
});
