## Description

This [PyBossa]() project enables the crowdsourcing of new or modified
drugs indications from FDA approvals.

Usually, an FDA approval consists of several (PDF) documents. The user is
required to read through the document, find the relevant information and
complete a web form once she finds it.

A PyBossa project is centered around **tasks**. A task is the user's atomic
operation of solving a given problem.


Components:

* `template.html` is the main task template file that will be used by the crowd
* `tutorial.html` is a "learning" template that is presented the first time a
  user enters the crowdsourcing project as a contributor, or on demand
* `project.json` contains the project identifier and metadata
* `results.html` is using PyBossa built in features to disseminate the results


## Usage

The easiest (and recommended) method to use the project source is through the
official command line PyBossa client, [pbs](https://github.com/PyBossa/pbs).

See the [installation](https://github.com/PyBossa/pbs#installation),
[configuration](https://github.com/PyBossa/pbs#configuring-pbs) and 
[usage](https://github.com/PyBossa/pbs#updating-project-templates) info on the 
project's page.

After installing and configuring `pbs`, if you update any project file you
should run `pbs update_project` for it to be updated with the latest files. See
`pbs --help` for more options.
