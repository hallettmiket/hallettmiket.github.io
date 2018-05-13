---
layout: paper
title: Building applications for interactive data exploration in systems biology
image: /images/papers/fjukstad-interactive.png
authors:   Fjukstad B,  Dumeaux V, Standahl Olsen K, Hallett M, Lund E, Bongo Ailo L
year: 2017
ref: Fjukstad B et al. 2017 bioRxiv
journal: "BioRxiv May 24"
doi: 10.1101/141630
github: github.com/fjukstad/mixt
pdf: /pdfs/papers/fjukstad-bioRxiv.pdf
---


# Abstract
As the systems biology community generates and collects
data at an unprecedented rate, there is a growing
need for interactive data exploration tools to explore
the datasets. These tools need to combine advanced
statistical analyses, relevant knowledge from
biological databases, and interactive visualizations in
an application with clear user interfaces. To answer
specific research questions tools must provide specialized
user interfaces and visualizations. While these
are application-specific, the underlying components
of a data analysis tool can be shared and reused later.
Application developers can therefore compose applications
of reusable services rather than implementing
a single monolithic application from the ground up
for each project.

Our approach for developing data exploration applications
in systems biology builds on the microservice
architecture. Microservice architectures separates
an application into smaller components that
communicate using language-agnostic protocols. We
show that this design is suitable in bioinformatics applications
where applications often use different tools,
written in different languages, by different research
groups. Packaging each service in a software container
enables re-use and sharing of key components
between applications, reducing development, deployment,
and maintenance time.

We demonstrate the viability of our approach
through a web application, MIxT blood-tumor, for
exploring and comparing transcriptional profiles from
blood and tumor samples in breast cancer patients.
The application integrates advanced statistical
software, up-to-date information from biological
databases, and modern data visualization libraries.
The web application for exploring transcriptional
profiles, MIxT, is online at mixt-blood-tumor.
bci.mcgill.ca and open-sourced at github.com/
fjukstad/mixt. Packages to build the supporting
microservices are open-sourced as a part of Kvik at
github.com/fjukstad/kvik.