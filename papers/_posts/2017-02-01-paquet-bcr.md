---
layout: paper
title: Detecting gene signature activation in breast cancer in an absolute, single patient manner
image: /images/papers/paquet-flow.png
authors:  Paquet E, Lesurf R, Tofigh A, Dumeaux V, Hallett M 
year: 2017
ref: Paquet E et al. 2017.  19(1).
journal: "Breast Cancer Research 19(1):32"
doi: 10.1186/s13058-017-0824-7
pmid: 28327201
github: https://github.com/meoyo/AIPS
pdf: /pdfs/papers/paquet-bcr.pdf
---


# Abstract
BACKGROUND:
The ability to reliably identify the state (activated, repressed, or latent) of any molecular process in the tumor of a patient from an individual whole-genome gene expression profile obtained from microarray or RNA sequencing (RNA-seq) promises important clinical utility. Unfortunately, all previous bioinformatics tools are only applicable in large and diverse panels of patients, or are limited to a single specific pathway/process (e.g. proliferation).

METHODS:
Using a panel of 4510 whole-genome gene expression profiles from 10 different studies we built and selected models predicting the activation status of a compendium of 1733 different biological processes. Using a second independent validation dataset of 742 patients we validated the final list of 1773 models to be included in a de novo tool entitled absolute inference of patient signatures (AIPS). We also evaluated the prognostic significance of the 1773 individual models to predict outcome in all and in specific breast cancer subtypes.

RESULTS:
We described the development of the de novo tool entitled AIPS that can identify the activation status of a panel of 1733 different biological processes from an individual breast cancer microarray or RNA-seq profile without recourse to a broad cohort of patients. We demonstrated that AIPS is stable compared to previous tools, as the inferred pathway state is not affected by the composition of a dataset. We also showed that pathway states inferred by AIPS are in agreement with previous tools but use far fewer genes. We determined that several AIPS-defined pathways are prognostic across and within molecularly and clinically define subtypes (two-sided log-rank test false discovery rate (FDR) <5%). Interestingly, 74.5% (1291/1733) of the models are able to distinguish patients with luminal A cancer from those with luminal B cancer (Fisher's exact test FDR <5%).

CONCLUSION:
AIPS represents the first tool that would allow an individual breast cancer patient to obtain a thorough knowledge of the molecular processes active in their tumor from only one individual gene expression (N-of-1) profile.