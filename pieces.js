// Récupération des pièces depuis le fichier JSON
const pieces = await fetch("pieces-autos.json").then(pieces => pieces.json())
//const pieces = await reponse.json();

function genererPieces(pieces) {
    for(let i = 0; i < pieces.length; i++) {
        const article = pieces[i];
        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment";
        const disponibiliteElement = document.createElement("p");
        disponibiliteElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";

        const sectionFiches = document.querySelector(".fiches");
        const pieceElement = document.createElement("article");
        sectionFiches.appendChild(pieceElement);
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
    }
}

genererPieces(pieces);

// tris
const boutonTrierPrixCroissant = document.querySelector(".btn-trier-prix-croissant");
boutonTrierPrixCroissant.addEventListener("click", function() {
    const piecesTrieesPrixCroissant = Array.from(pieces);
    piecesTrieesPrixCroissant.sort(function(a, b) {
        return a.prix - b.prix;
    });
    console.log(piecesTrieesPrixCroissant);

    document.querySelector(".fiches").innerHTML='';
    genererPieces(piecesTrieesPrixCroissant);
});

const boutonTrierPrixDecroissant = document.querySelector(".btn-trier-prix-decroissant");
boutonTrierPrixDecroissant.addEventListener("click", function() {
    const piecesTrieesPrixDecroissant = Array.from(pieces);
    piecesTrieesPrixDecroissant.sort(function(a, b) {
        return b.prix - a.prix;
    });
    console.log(piecesTrieesPrixDecroissant);

    document.querySelector(".fiches").innerHTML='';
    genererPieces(piecesTrieesPrixDecroissant);
});

//filtres
const boutonFiltrerPrix = document.querySelector(".btn-filtrer-prix");
boutonFiltrerPrix.addEventListener("click", function() {
    const piecesFiltreesPrix = pieces.filter(function(pieceFiltreePrix) {
        return pieceFiltreePrix.prix <= 35;
    });
    console.log(piecesFiltreesPrix);

    document.querySelector(".fiches").innerHTML='';
    genererPieces(piecesFiltreesPrix);
});

const boutonFiltrerDescription = document.querySelector(".btn-filtrer-description");
boutonFiltrerDescription.addEventListener("click", function() {
    const piecesFiltreesDescription = pieces.filter(function(pieceFiltreeDescription) {
        return pieceFiltreeDescription.description != undefined &&
            pieceFiltreeDescription.description != null &&
            pieceFiltreeDescription.description != ""; 
            // return pieceFiltreeDescription.description;
    });
    console.log(piecesFiltreesDescription);

    document.querySelector(".fiches").innerHTML='';
    genererPieces(piecesFiltreesDescription);
});

const rangerFiltrerPrixMax = document.querySelector("#filtrer-plage-prix");
rangerFiltrerPrixMax.addEventListener("change", function() {
    const piecesFiltreesPrixMax = pieces.filter(function(pieceFiltreesPrixMax) {
        return pieceFiltreesPrixMax.prix <= rangerFiltrerPrixMax.value;
    });

    document.querySelector(".fiches").innerHTML='';
    genererPieces(piecesFiltreesPrixMax);
})

//listes
const nomsPiecesAbordables = pieces.map(piece => piece.nom);
for(let i = pieces.length - 1; i >= 0; i--) {
    if(pieces[i].prix >= 35) {
        nomsPiecesAbordables.splice(i, 1);
    }
}
const abordablesElements = document.createElement("ul");
for(let i = 0; i < nomsPiecesAbordables.length; i++) {
    const nomElement = document.createElement("li");
    nomElement.innerText = nomsPiecesAbordables[i];
    abordablesElements.appendChild(nomElement);
}
document.querySelector(".abordables").appendChild(abordablesElements);

const nomsPiecesDisponibles = pieces.map(piece => piece.nom);
const prixPiecesDisponibles = pieces.map(piece => piece.prix);
for(let i = pieces.length - 1; i >= 0; i--) {
    if(! pieces[i].disponibilite) {
        nomsPiecesDisponibles.splice(i, 1);
        prixPiecesDisponibles.splice(i, 1);
    }
}
const disponiblesElements = document.createElement("ul");
for(let i = 0; i < nomsPiecesDisponibles.length; i++) {
    const nomEtPrixElement = document.createElement("li");
    nomEtPrixElement.innerText = `${nomsPiecesDisponibles[i]} - ${prixPiecesDisponibles[i]} €`;
    disponiblesElements.appendChild(nomEtPrixElement);
}
document.querySelector(".disponibles").appendChild(disponiblesElements);