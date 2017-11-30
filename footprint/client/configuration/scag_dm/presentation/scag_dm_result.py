
# UrbanFootprint v1.5
# Copyright (C) 2016 Calthorpe Analytics
#
# This file is part of UrbanFootprint version 1.5
#
# UrbanFootprint is distributed under the terms of the GNU General
# Public License version 3, as published by the Free Software Foundation. This
# code is distributed WITHOUT ANY WARRANTY, without implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General
# Public License v3 for more details; see <http://www.gnu.org/licenses/>.


from footprint.client.configuration.fixture import ResultConfigurationFixture
from footprint.client.configuration.scag_dm.config_entity.scag_dm_config_entities import ScagDmDbEntityKey
from footprint.main.publishing.result_initialization import ResultConfiguration, ResultLibraryKey, ResultKey, ResultSort
from footprint.main.utils.fixture_list import FixtureList


class ScagDmResultConfigurationFixtures(ResultConfigurationFixture):


    def results(self):
        """
            Used to update or create Results per ConfigEntity instance
            Returns the result library(ies) scoped for the class of self.config_entity.
            The Result will belong to the ResultLibrary specified by result_library_key
        :return:
        """
        return FixtureList(
            # Basic Core result query that summarizes increments
            self.parent_fixture.results() + [

                # Line Chart Config
                ResultConfiguration(
                    result_type='line_chart',
                    library_keys=[ResultLibraryKey.APPLICATION],
                    result_db_entity_key=ResultKey.POPULATION_BY_YEAR,
                    source_db_entity_key=ScagDmDbEntityKey.CITY_BOUNDARY,

                    name='Population By Year',
                    attributes=['pop16', 'pop20', 'pop30', 'pop35', 'pop45'],
                    db_column_lookup=dict(
                        pop16='pop16',
                        pop20='pop20',
                        pop30='pop30',
                        pop35='pop35',
                        pop45='pop45'
                    ),
                    labels=['pop16', 'pop20', 'pop30', 'pop35', 'pop45'],
                    stackable=False,
                    is_stacked=False,
                    create_query=lambda result_config: 'SELECT SUM(pop16) as pop16__sum, SUM(pop20) as pop20__sum, SUM(pop30) as pop30__sum, SUM(pop35) as pop35__sum, SUM(pop45) as pop45__sum FROM %({0})s'.format(ScagDmDbEntityKey.CITY_BOUNDARY),
                    sort_priority=ResultSort.BASE
                ),

                ResultConfiguration(
                    result_type='line_chart',
                    library_keys=[ResultLibraryKey.APPLICATION],
                    result_db_entity_key=ResultKey.HOUSEHOLDS_BY_YEAR,
                    source_db_entity_key=ScagDmDbEntityKey.CITY_BOUNDARY,

                    name='Households By Year',
                    attributes=['hh16', 'hh20', 'hh30', 'hh35', 'hh45'],
                    db_column_lookup=dict(
                        hh16='hh16',
                        hh20='hh20',
                        hh30='hh30',
                        hh35='hh35',
                        hh45='hh45'
                    ),
                    labels=['hh16', 'hh20', 'hh30', 'hh35', 'hh45'],
                    stackable=False,
                    is_stacked=False,
                    create_query=lambda result_config: 'SELECT SUM(hh16) as hh16__sum, SUM(hh20) as hh20__sum, SUM(hh30) as hh30__sum, SUM(hh35) as hh35__sum, SUM(hh45) as hh45__sum FROM %({0})s'.format(ScagDmDbEntityKey.CITY_BOUNDARY),
                    sort_priority=ResultSort.BASE
                ),

                ResultConfiguration(
                    result_type='line_chart',
                    library_keys=[ResultLibraryKey.APPLICATION],
                    result_db_entity_key=ResultKey.EMPLOYMENT_BY_YEAR,
                    source_db_entity_key=ScagDmDbEntityKey.CITY_BOUNDARY,

                    name='Employment By Year',
                    attributes=['emp16', 'emp20', 'emp30', 'emp35', 'emp45'],
                    db_column_lookup=dict(
                        emp16='emp16',
                        emp20='emp20',
                        emp30='emp30',
                        emp35='emp35',
                        emp45='emp45'
                    ),
                    labels=['emp16', 'emp20', 'emp30', 'emp35', 'emp45'],
                    stackable=False,
                    is_stacked=False,
                    create_query=lambda result_config: 'SELECT SUM(emp16) as emp16__sum, SUM(emp20) as emp20__sum, SUM(emp30) as emp30__sum, SUM(emp35) as emp35__sum, SUM(emp45) as emp45__sum FROM %({0})s'.format(ScagDmDbEntityKey.CITY_BOUNDARY),
                    sort_priority=ResultSort.BASE
                )
            ])
