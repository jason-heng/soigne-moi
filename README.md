# Requirements

Pour installer le projet vous devez avoir:

- Node.js
- NPM
- PNPM

Note: Pour installer PNPM vous pouvez faire:

```bash
npm i pnpm -g
```

Puis relancer votre terminal ou IDE.

# Installation

Pour installer le site web en local, commencez par cloner le repository github :

```bash
git clone https://github.com/jason-heng/soigne-moi-web
```

Ensuite dupliquez le fichier .env.example et renommez le en .env puis remplissez les variables d’environements avec les votres.

<aside>
💡 La variable d’environement “AUTH_SECRET” est un code utilisé pour la gestion des sessions d’utilisateurs que vous pouvez generer avec un generateur de mot de passes
</aside>
<br>
<aside>
💡 Le reste des variables d’environments sont liés a votre base de données postgreSQL
</aside>
<br>

Apres ca, installez les modules necessaires a l’execution du site en faisant:

```bash
pnpm i
```

Ensuite, pour mettre en place votre base de données faites:

```bash
pnpm dlx prisma db push
```

Finalement vous pouvez lancer le site en mode dev via:

```bash
pnpm run dev
```

ou bien le compiler et le lancer via:

```bash
pnpm run build
pnpm start
```